export interface ApprovedMetric {name:string;baseline:string;finalValue:string;definition:string;period:string;source:string;approved:boolean;}
export interface CaseStudy {
  slug:string;projectName:string;client?:string;approved:boolean;sourceReference:string;industry:string;
  challenge:string;objective:string;workDelivered:string;keyDecisions:string[];technologies:string[];
  services:string[];solutions:string[];metrics:ApprovedMetric[];testimonial?:{quote:string;attribution:string;approved:boolean;source:string};
}
export function publishableMetric(metric:ApprovedMetric){return metric.approved&&[metric.name,metric.baseline,metric.finalValue,metric.definition,metric.period,metric.source].every(v=>typeof v==='string'&&v.trim().length>0);}
export function publishableCaseStudy(study:CaseStudy){return study.approved&&[study.slug,study.projectName,study.sourceReference,study.challenge,study.objective,study.workDelivered].every(v=>typeof v==='string'&&v.trim().length>0)&&study.metrics.every(publishableMetric);}
