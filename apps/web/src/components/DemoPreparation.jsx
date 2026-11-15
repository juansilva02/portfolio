import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import './DemoPreparation.css';

const stages = ['Creando la base de datos', 'Configurando la API', 'Preparando tu demo'];

export default function DemoPreparation({ status }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const started = performance.now();
    const timer = setInterval(() => setElapsed(Math.floor((performance.now() - started) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);
  const active = status === 'pending' ? -1 : Math.min(2, Math.floor(elapsed / 15));
  return <div className="space-y-5">
    <div className="flex items-center gap-3 text-sky-200" role="status">
      <Loader2 className="demo-spinner size-5 shrink-0" aria-hidden="true" />
      <span className="demo-shimmer">{active < 0 ? 'Tu demo está en cola' : stages[active]}</span>
    </div>
    <p className="text-sm tabular-nums text-slate-400">Tiempo en esta pantalla · {Math.floor(elapsed / 60)} min {elapsed % 60} s</p>
    <ol className="space-y-4" aria-label="Etapas estimadas">
      {stages.map((label, index) => <li key={label} className="flex items-center gap-3 text-sm text-slate-300">
        {index < active ? <CheckCircle2 className="size-4 text-sky-300" aria-hidden="true" /> : <span className={index === active ? 'demo-pulse size-2 rounded-full bg-sky-200' : 'size-2 rounded-full bg-slate-600'} aria-hidden="true" />}
        <span>{label}</span>
      </li>)}
    </ol>
    <p className="text-xs leading-relaxed text-slate-400">Las etapas son orientativas. Confirmaremos el acceso cuando termine la preparación del servidor.</p>
    {status === 'pending' && <p className="text-sm leading-relaxed text-slate-300">La preparación todavía no comenzó. Puede haber otras altas en curso o haberse alcanzado el límite de demos activas. Tu solicitud está guardada.</p>}
  </div>;
}

export function DemoCredentials({ username }) {
  return <div className="space-y-3 rounded-xl border border-slate-600 bg-slate-950/40 p-4">
    <p className="text-sm text-slate-400">Tu usuario</p>
    <p className="break-all font-medium">{username}</p>
    <p className="text-sm text-slate-300">Al entrar por primera vez podrás elegir tu contraseña.</p>
  </div>;
}
