import {ESLint} from 'eslint';
import ts from 'typescript';
import fs from 'node:fs/promises';
const reports=await new ESLint().lintFiles(['src']);
for(const report of reports){
 const names=new Set(report.messages.filter(m=>m.ruleId==='@typescript-eslint/no-unused-vars').map(m=>m.message.match(/^'([^']+)'/)?.[1]).filter(Boolean));
 if(!names.size)continue;
 let source=await fs.readFile(report.filePath,'utf8');const ast=ts.createSourceFile(report.filePath,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];
 for(const node of ast.statements){if(!ts.isImportDeclaration(node)||!node.importClause)continue;const c=node.importClause;const named=c.namedBindings&&ts.isNamedImports(c.namedBindings)?c.namedBindings.elements.filter(n=>!names.has(n.name.text)):[];const def=c.name&&!names.has(c.name.text)?c.name.text:'';
 if(c.namedBindings&&!ts.isNamedImports(c.namedBindings))continue;
 const originalCount=(c.namedBindings&&ts.isNamedImports(c.namedBindings)?c.namedBindings.elements.length:0)+(c.name?1:0);
 if(named.length+(def?1:0)===originalCount)continue;
 const bits=[def,named.length?`{ ${named.map(n=>n.getText(ast)).join(', ')} }`:''].filter(Boolean);
 edits.push({start:node.getStart(ast),end:node.end,text:bits.length?`import ${c.isTypeOnly?'type ':''}${bits.join(', ')} from ${node.moduleSpecifier.getText(ast)};`:''});
 }
 for(const e of edits.reverse())source=source.slice(0,e.start)+e.text+source.slice(e.end);
 await fs.writeFile(report.filePath,source);
}
