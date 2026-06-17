import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COMMAND = 'sudo zuzudev "juansilva02"';
const QUOTE_INDEX = COMMAND.indexOf('"');

const HeroBootLine = ({ onComplete, skip = false }) => {
  const [typed, setTyped] = useState(skip ? COMMAND : '');
  const [done, setDone] = useState(skip);
  const timers = useRef([]);
  const calledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const fire = () => {
      if (calledRef.current) return;
      calledRef.current = true;
      if (onCompleteRef.current) onCompleteRef.current();
    };
    const add = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    if (skip) {
      fire();
      return undefined;
    }

    let i = 0;
    const typeNext = () => {
      i += 1;
      setTyped(COMMAND.slice(0, i));
      if (i < COMMAND.length) add(typeNext, 26);
      else add(() => { setDone(true); fire(); }, 80);
    };
    add(typeNext, 26);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [skip]);

  const head = QUOTE_INDEX !== -1 && typed.length > QUOTE_INDEX ? typed.slice(0, QUOTE_INDEX) : typed;
  const arg = QUOTE_INDEX !== -1 && typed.length > QUOTE_INDEX ? typed.slice(QUOTE_INDEX) : '';

  return (
    <div
      className="inline-flex items-center gap-2.5 liquid-glass-blue rounded-xl px-3.5 py-2 font-mono text-xs sm:text-sm shadow-lg shadow-slate-950/30 max-w-fit"
      aria-hidden="true"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      <span className="mx-1 h-3 w-px bg-slate-600/50" />
      <span className="whitespace-nowrap">
        <span className="hidden text-emerald-400 sm:inline">visitante@</span>
        <span className="text-emerald-400">zuzudev.pro</span>
        <span className="text-slate-500">:</span>
        <span className="text-sky-400">~</span>
        <span className="text-slate-500">$ </span>
        <span className="text-slate-200">{head}</span>
        <span className="text-sky-400">{arg}</span>
        {!done && (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-slate-300 align-text-bottom" />
        )}
        {done && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="ml-1.5 text-emerald-400"
          >
            ✓
          </motion.span>
        )}
      </span>
    </div>
  );
};

export default HeroBootLine;
