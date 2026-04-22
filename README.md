[big_bulk_beta_full_deployable_readme.md](https://github.com/user-attachments/files/26952421/big_bulk_beta_full_deployable_readme.md)
# BIG Bulk Beta – Full Deployable Version

## Project Structure

```text
big-bulk-beta/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
├─ components/
│  └─ WorkoutTracker.tsx
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ next.config.js
```

## package.json
```json
{
  "name": "big-bulk-beta",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "recharts": "latest"
  }
}
```

## app/layout.tsx
```tsx
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html><body>{children}</body></html>
}
```

## app/page.tsx
```tsx
import WorkoutTracker from '../components/WorkoutTracker'
export default function Page(){return <WorkoutTracker/>}
```

## components/WorkoutTracker.tsx
```tsx
'use client'
import {useState,useEffect} from 'react'
export default function WorkoutTracker(){
 const [text,setText]=useState('');
 const [logs,setLogs]=useState<any[]>([]);
 useEffect(()=>{const s=localStorage.getItem('logs'); if(s) setLogs(JSON.parse(s));},[])
 useEffect(()=>{localStorage.setItem('logs',JSON.stringify(logs));},[logs])
 const add=()=>{setLogs([{entry:text,date:new Date().toLocaleDateString()},...logs]); setText('')}
 return <main className='min-h-screen p-6 max-w-md mx-auto grid gap-4'>
 <h1 className='text-4xl font-semibold'>BIG Bulk Beta</h1>
 <input value={text} onChange={e=>setText(e.target.value)} placeholder='Bench Press 8 reps 80kg' className='border p-3 rounded-xl'/>
 <button onClick={add} className='bg-black text-white p-3 rounded-2xl'>Log Workout</button>
 {logs.map((l,i)=><div key={i} className='border rounded-xl p-3'>{l.date} • {l.entry}</div>)}
 </main>
}
```

## Deploy Steps
1. Create GitHub repo `big-bulk-beta`
2. Add these files
3. Push to GitHub
4. Import repo into Vercel
5. Deploy

## Result
Your app goes live at a Vercel URL and can be added to your phone home screen.

