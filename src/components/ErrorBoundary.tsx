import {Component, type ReactNode} from 'react';
import type {SiteConfig} from '../lib/siteConfig';
import {reportError} from '../lib/analytics';
export default class ErrorBoundary extends Component<{children:ReactNode;config:SiteConfig},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){reportError('render_failure',this.props.config);}
  render(){return this.state.failed?<section className="page-shell site-container" role="alert"><h1 className="page-title">We couldn’t display this page.</h1><p className="mt-6">Please try again or use one of the links below.</p><div className="mt-8 flex flex-wrap gap-5"><button className="btn-primary" onClick={()=>window.location.reload()}>Try again</button><a className="btn-secondary" href="/">Homepage</a><a className="btn-secondary" href="/services/">Services</a></div></section>:this.props.children;}
}
