import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function WorkoutTracker(){
 const [logs,setLogs]=useState([]);
 const [text,setText]=useState('Bench Press 8 reps 80kg');
 const [status,setStatus]=useState('Ready');
 const [listening,setListening]=useState(false);
 useEffect(()=>{const s=localStorage.getItem('workout_logs'); if(s) setLogs(JSON.parse(s));},[]);
 useEffect(()=>{localStorage.setItem('workout_logs',JSON.stringify(logs));},[logs]);
 const parse=(raw)=>{const m=raw.match(/(.+?)\s+(\d+)\s*reps?\s+(\d+)\s*(kg|lb)?/i); return m?{exercise:m[1],reps:+m[2],weight:+m[3],unit:m[4]||'kg',date:new Date().toLocaleDateString()}:null};
 const sync=async(row)=>{try{await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(row)});setStatus('Synced to Google Sheets');}catch(e){setStatus('Saved locally');}};
 const add=async(v=text)=>{const r=parse(v); if(!r) return setStatus('Format: Bench Press 8 reps 80kg'); setLogs([r,...logs]); setText(''); await sync(r);};
 const voice=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return setStatus('Voice unsupported'); const rec=new SR(); rec.onstart=()=>{setListening(true)}; rec.onend=()=>setListening(false); rec.onresult=(e)=>add(e.results[0][0].transcript); rec.start();};
 const data=useMemo(()=>{const m={}; logs.forEach(l=>{if(!m[l.exercise])m[l.exercise]=[]; m[l.exercise].push({date:l.date,weight:l.weight,volume:l.weight*l.reps});}); return m;},[logs]);
 const first=Object.keys(data)[0];
 return <div className='p-6 grid gap-4'>
 <Card><CardContent className='p-4 grid gap-3'>
 <h1 className='text-2xl font-bold'>BIG Bulk Tracker V2</h1>
 <p className='text-sm text-gray-500'>ChatGPT feel • Google Sheets backend</p>
 <Textarea value={text} onChange={e=>setText(e.target.value)} />
 <div className='flex gap-2'><Button onClick={()=>add()}>Log Set</Button><Button onClick={voice}>{listening?'Listening':'Voice Log'}</Button></div>
 <p>{status}</p>
 </CardContent></Card>
 <Card><CardContent className='p-4'>{logs.map((l,i)=><div key={i}>{l.date} • {l.exercise}: {l.reps} @ {l.weight}{l.unit}</div>)}</CardContent></Card>
 {first && <Card><CardContent className='p-4'><div className='h-64'><ResponsiveContainer width='100%' height='100%'><LineChart data={data[first]}><XAxis dataKey='date'/><YAxis/><Tooltip/><Line dataKey='weight'/></LineChart></ResponsiveContainer></div></CardContent></Card>}
 </div>
}
