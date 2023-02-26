import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import FormComponent from './FormComponent';
import GitHubComponent from './GithubComponent';
import { EvervaultProvider } from '@evervault/react';

const inter = Inter({ subsets: ['latin'] })

export default function App() {
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} className={inter.className}>
    <EvervaultProvider teamId={process.env.NEXT_PUBLIC_EVERVAULT_TEAM_ID} appId={process.env.NEXT_PUBLIC_EVERVAULT_APP_ID}>
    <div style={{padding: '20px'}}>< GitHubComponent / ></div>
    or
    <div style={{padding: '20px'}}>< FormComponent / ></div>
    </EvervaultProvider>
    </div>
  );
}