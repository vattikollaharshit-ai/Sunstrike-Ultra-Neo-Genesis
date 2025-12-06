const SU = { KEYS: { STATS: 'su_stats_final', PRACTICE: 'su_practice_final', TESTS: 'su_tests_final', WEEK: 'su_week_final' } };

function save(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function load(k,fb){ try{ const t=localStorage.getItem(k); return t? JSON.parse(t): fb }catch(e){ return fb } }

function ensureStats(){ const d={ level:1, xp:0, xpToNext:100, skillPoints:1, title:'Rookie', stats:{ Speed:1, Intelligence:1, Vitality:1, Endurance:1, Focus:1, Agility:1 } }; if(!load(SU.KEYS.STATS,null)) save(SU.KEYS.STATS,d); }
function getStats(){ ensureStats(); return load(SU.KEYS.STATS); }

function computeTitle(l){ if(l<3) return 'Apprentice'; if(l<6) return 'Warrior'; if(l<10) return 'Elite'; if(l<15) return 'Ascendant'; return 'Sunstriker'; }

function addXP(n,src){ if(!n||n<=0) return 0; const s=getStats(); const mult=1 + (s.stats.Speed-1)*0.015 + (s.stats.Focus-1)*0.01; const gained=Math.round(n*mult); s.xp=(s.xp||0)+gained; while(s.xp >= (s.xpToNext||100)){ s.xp -= (s.xpToNext||100); s.level=(s.level||1)+1; s.skillPoints=(s.skillPoints||0)+1; s.title = computeTitle(s.level); s.xpToNext = Math.round((s.xpToNext||100)*1.5); } save(SU.KEYS.STATS,s); const wk=load(SU.KEYS.WEEK,{}); const day=new Date().toISOString().slice(0,10); wk[day]=(wk[day]||0)+gained; save(SU.KEYS.WEEK,wk); return gained; }

function savePracticeEntry(e){ const arr = load(SU.KEYS.PRACTICE, []); if(arr.some(x=> x.t === e.t)) return false; arr.push(e); save(SU.KEYS.PRACTICE, arr); return true; }

function allocatePoint(stat){ const s=getStats(); if((s.skillPoints||0) <= 0) return false; s.skillPoints--; s.stats[stat] = (s.stats[stat]||1)+1; save(SU.KEYS.STATS,s); return true; }