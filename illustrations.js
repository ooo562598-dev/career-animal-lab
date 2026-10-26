/* 手绘感 SVG 图层：沿用原站猫耳、椭圆脸、豆豆眼和深色描边。
 * 无外链图片、无 Emoji 职业插画；动物身份与职业图层分离。 */
const LabArt = (() => {
  const ink = '#292433';
  const palettes = {
    R: ['#bd603c','#f5bb7c','#fff3d9'], I: ['#596778','#aab8bf','#fff8ed'],
    A: ['#c4a083','#806454','#fff0d9'], S: ['#fff4e2','#b3b9ce','#fffaf0'],
    E: ['#f3a052','#df7544','#ffdfaf'], C: ['#b18459','#78543c','#efcd9e']
  };
  const sceneSpec = {
    machine: ['overalls','machine','blueprint'], circuit: ['overalls','circuit','signal'],
    electronics: ['labcoat','oscilloscope','molecule'], cnc: ['overalls','cnc','gear'],
    socialResearch: ['vest','clipboard','network'], classroom: ['sweater','book','math'],
    prototype: ['apron','model','sketch'], quality: ['overalls','caliper','check'], repair: ['overalls','toolbox','gear'], wood: ['apron','wood','ruler'],
    data: ['shirt','laptop','bars'], business: ['vest','laptop','dashboard'], survey: ['vest','clipboard','pie'], interview: ['shirt','interview','notes'],
    environment: ['labcoat','water','landscape'], lab: ['labcoat','chemistry','molecule'], optimization: ['shirt','laptop','network'],
    design: ['apron','tablet','palette'], animation: ['apron','tablet','frames'], writing: ['sweater','book','story'], film: ['vest','camera','clapper'],
    music: ['sweater','keyboard','music'], photo: ['vest','camera','photos'], interior: ['apron','model','room'],
    teaching: ['sweater','book','lesson'], community: ['vest','interview','heart'], health: ['labcoat','clipboard','health'],
    rehab: ['sweater','therapy','steps'], tutoring: ['sweater','interview','lesson'], workshop: ['apron','palette','craft'], support: ['vest','clipboard','resources'],
    marketing: ['suit','megaphone','campaign'], negotiation: ['suit','contract','handshake'], leadership: ['suit','flag','plan'], sales: ['suit','shop','growth'],
    event: ['vest','calendar','event'], fundraising: ['suit','donation','heart'], procurement: ['suit','boxes','check'], press: ['suit','microphone','news'],
    accounting: ['vest','calculator','ledger'], budget: ['vest','calculator','budget'], database: ['shirt','server','database'], archive: ['vest','folders','index'],
    payroll: ['vest','calculator','time'], logistics: ['vest','boxes','route'], tax: ['vest','clipboard','tax'], admin: ['vest','folders','calendar']
  };
  const path = (d, fill='none', extra='') => `<path d="${d}" fill="${fill}" ${extra}/>`;
  const rect = (x,y,w,h,fill,rx=6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
  const circle = (x,y,r,fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
  const line = (x,y,a,b) => `<path d="M${x} ${y}L${a} ${b}" fill="none"/>`;
  function animal(type, outfit='none', pose='wave') {
    const [fur, dark, light] = palettes[type];
    const isPanda = type === 'R', beaver = type === 'C';
    let tail = beaver
      ? `<g transform="rotate(-30 190 209)"><ellipse cx="190" cy="209" rx="24" ry="42" fill="${dark}"/>${path('M174 184l32 44m-37-24l34 28m-30-9l31-30m-32 17l26-29','none','stroke="#c69a6d" stroke-width="2"')}</g>`
      : isPanda
      ? `${path('M176 214C245 233 253 145 214 152C188 156 227 203 173 182Z',fur)}${path('M210 155l10 23m-4 10l22 5m-34 10l19 17',dark,'stroke-width="10"')}`
      : path('M176 211Q234 207 208 177Q199 170 195 182','none',`stroke="${dark}" stroke-width="15"`);
    // 工作道具通常在右侧，把小熊猫的大尾巴放在左侧，避免被工具台遮住。
    if (isPanda && pose === 'work') tail = `<g transform="translate(240 0) scale(-1 1)">${tail}</g>`;
    const ears = isPanda || beaver
      ? `${circle(65,61,isPanda?26:21,fur)}${circle(175,61,isPanda?26:21,fur)}${circle(65,61,13,light)}${circle(175,61,13,light)}`
      : `${path('M52 88L49 28Q49 17 62 25L98 59',fur)}${path('M142 59L179 25Q193 18 191 33L187 89',fur)}${path('M60 65L60 37L82 58','#efb1a0')}${path('M156 58L180 37L179 65','#efb1a0')}`;
    const clothes = { none: fur, overalls:'#8bbcc6', apron:'#c9d99c', labcoat:'#fffdf8', shirt:'#b8d6e8', vest:'#a5c9b8', sweater:'#ecbdb4', suit:'#738ca3' };
    const body = `${path('M73 151Q48 186 65 231Q120 255 179 231Q191 188 168 153Z',clothes[outfit])}
      ${outfit==='overalls'?`${rect(81,166,77,57,'#70a3b2')}${line(83,156,91,190)}${line(159,156,151,190)}${rect(107,186,29,24,'#b9dde0')}`:''}
      ${outfit==='apron'?`${path('M91 162L82 236H160L150 162Z','#e4e5ac')}${rect(104,200,28,21,'#fff6d8')}`:''}
      ${outfit==='suit'?`${path('M96 157L120 200L143 157','#fff8ed')}${path('M115 165L126 165L123 179L129 207L119 217L112 206L118 179Z','#e69c69')}`:''}
      ${outfit==='labcoat'?`${path('M93 158L115 186L123 171L145 159','#b9dae3')}${line(120,186,120,238)}${rect(141,197,21,19,'#d5e9e4')}`:''}
      ${outfit==='vest'?`${path('M97 158L120 192L143 158','#fff8e9')}${line(120,192,120,237)}${circle(127,209,2,ink)}${rect(144,194,17,13,'#f9e5b5')}`:''}
      ${outfit==='none'?`<ellipse cx="121" cy="205" rx="31" ry="32" fill="${light}" stroke="none"/>`:''}
      <ellipse cx="87" cy="237" rx="20" ry="11" fill="${fur}"/><ellipse cx="153" cy="237" rx="20" ry="11" fill="${fur}"/>`;
    let face = `${ears}<path d="M52 92C47 49 189 45 190 98L188 121C185 168 59 174 51 127Z" fill="${fur}"/>`;
    if (isPanda) face += `${path('M57 103Q71 67 96 85L106 118Q76 145 57 120',light)}${path('M184 103Q169 67 145 85L135 118Q165 145 185 120',light)}<ellipse cx="121" cy="133" rx="29" ry="20" fill="${light}" stroke="none"/>`;
    else if (type==='I') face += path('M92 95L121 70L149 95L155 138Q121 162 88 138Z',light,'stroke="none"');
    else if (type==='A') face += `${path('M54 100Q82 75 103 103L102 120L63 128Z',dark,'stroke="none"')}${path('M139 103Q164 78 188 102L179 129L141 120Z',dark,'stroke="none"')}`;
    else if (type==='S') face += `${path('M54 95Q58 63 83 71L94 97Z',dark,'stroke="none"')}${path('M151 76Q180 62 189 102L161 98Z',dark,'stroke="none"')}`;
    else if (type==='E') face += path('M100 64L104 83M120 62V80M140 65L136 83','none',`stroke="${dark}" stroke-width="7"`);
    if (beaver) face += `<ellipse cx="122" cy="131" rx="40" ry="24" fill="${light}" stroke="none"/>${rect(111,138,11,20,'#fff9ee',2)}${rect(122,138,11,20,'#fff9ee',2)}`;
    face += `<ellipse cx="87" cy="108" rx="6" ry="9" fill="${ink}" stroke="none"/><ellipse cx="155" cy="108" rx="6" ry="9" fill="${ink}" stroke="none"/>
      <ellipse cx="75" cy="124" rx="10" ry="5" fill="#efb0a2" stroke="none"/><ellipse cx="169" cy="124" rx="10" ry="5" fill="#efb0a2" stroke="none"/>
      ${path('M114 127Q121 122 128 127L122 132Z',isPanda||beaver?ink:'#c56e70')}${path('M121 132Q114 145 107 135M121 132Q129 145 136 135')}`;
    if (!beaver&&!isPanda) face += path('M66 131L34 126M65 139L35 144M176 131L208 126M178 139L207 145');
    if (type==='I') face += `${rect(67,94,39,30,'none',12)}${rect(136,94,39,30,'none',12)}${path('M106 105Q120 96 136 105')}`;
    if (type==='A') face += `${path('M67 61Q78 30 138 38Q168 37 177 61Z','#ab92b8')}${path('M120 38Q116 25 128 26')}`;
    if (type==='S') face += `${path('M96 161L119 172L144 160L141 184L120 176L98 184Z','#92b7a4')}`;
    if (type==='E') face += `${path('M101 160L119 171L139 160V182L120 174L101 182Z','#e88874')}`;
    const hands = pose==='work'
      ? `<ellipse cx="65" cy="203" rx="15" ry="23" fill="${fur}" transform="rotate(-38 65 203)"/><ellipse cx="178" cy="199" rx="15" ry="24" fill="${fur}" transform="rotate(48 178 199)"/>`
      : `<ellipse cx="63" cy="194" rx="15" ry="25" fill="${fur}"/><ellipse cx="182" cy="165" rx="15" ry="26" fill="${fur}" transform="rotate(35 182 165)"/>${circle(180,157,5,light)}`;
    return `<g stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${tail}${body}${face}${hands}</g>`;
  }
  function board(mode, variant=0) {
    const bars = [22,38,29,54].map((h,i)=>rect(14+i*20,80-h,12,h,['#96c5b7','#f6c978','#eaa58f','#aebcdb'][i],3)).join('');
    const notes = `${rect(13,17,32,24,'#ffe4a0')}${rect(53,17,38,24,'#cce5d5')}${line(18,52,83,52)}${line(18,63,73,63)}${line(18,74,86,74)}`;
    const drawings = {
      bars, dashboard: `${bars}${path('M13 22L36 14L58 24L86 9','none','stroke="#cb8e78"')}`,
      pie: `${circle(50,47,28,'#c2dfd8')}${path('M50 47V19A28 28 0 0 1 78 47Z','#e5ab8c')}${line(13,85,88,85)}`,
      network: `${path('M20 25L72 20L48 65L20 25L25 80L80 79L72 20M48 65L80 79')}${circle(20,25,7,'#cce5d5')}${circle(72,20,7,'#ffe4a0')}${circle(48,65,7,'#cbd7ec')}${circle(25,80,6,'#edc7cf')}${circle(80,79,6,'#ffe4a0')}`,
      blueprint: `${path('M17 67V32L49 13L82 32V67L49 85ZM17 32L49 50L82 32M49 50V85')}${line(17,92,83,92)}`,
      signal: path('M7 50H20L29 25L39 78L51 17L62 66L73 36L81 50H94','none','stroke="#6b9f9d"'),
      gear: `${circle(51,49,29,'#bdcbd6')}${circle(51,49,12,'#fff5d9')}${path('M50 11V24M50 75V88M12 49H25M77 49H90')}`,
      check: `${[19,43,67].map(y=>`${rect(10,y,15,15,'#d4e8ce',3)}${path(`M13 ${y+7}l4 4l8-10`)}${line(35,y+8,87,y+8)}`).join('')}`,
      ruler: `${rect(12,17,73,67,'#f4d39a')}${[22,32,42,52,62,72].map(x=>line(x,18,x,30)).join('')}${path('M18 71L52 38L77 71Z','#fff5dd')}`,
      landscape: `${circle(77,21,11,'#ffe3a0')}${path('M3 65L32 32L58 65L77 43L99 65','#c1d8b3')}${path('M1 75Q29 62 49 78T99 77','none','stroke="#8fbfcf" stroke-width="6"')}`,
      molecule: `${path('M29 31L68 20L81 61L45 80L29 31')}${circle(29,31,12,'#cae0d5')}${circle(68,20,9,'#f2bc9b')}${circle(81,61,10,'#d7c7e4')}${circle(45,80,12,'#cae0d5')}`,
      palette: `${circle(26,26,12,'#e8a5a1')}${circle(68,26,12,'#eec579')}${circle(26,64,12,'#a9c6c9')}${circle(68,64,12,'#b5cca1')}`,
      frames: `${rect(9,18,38,55,'#d7c7e4')}${rect(53,18,38,55,'#f6d19d')}${path('M22 53Q28 33 37 53M66 52Q75 24 82 52')}`,
      story: `${path('M13 71Q37 50 45 67T90 45','none','stroke="#9e93b5" stroke-width="6"')}${notes}`,
      clapper: `${rect(12,38,76,42,'#607181')}${path('M12 38L6 21L79 6L87 24Z','#fff5dd')}${path('M20 18L31 34M44 13L54 29M65 9L76 25')}`,
      music: `${path('M34 64V26L75 16V53')}${circle(25,65,10,'#d7c7e4')}${circle(66,55,10,'#a9c6c9')}`,
      photos: `${rect(7,10,49,55,'#fff8e8')}${rect(39,39,53,51,'#fff8e8')}${circle(26,28,7,'#ffd780')}${path('M13 55L29 39L46 55','#bfd9cb')}${path('M45 80L63 57L85 80','#c4b9dc')}`,
      sketch: `${path('M13 65L43 21L82 63L60 81Z','#e9d7b0')}${path('M43 21L59 57L82 63M13 65L59 57L60 81')}`,
      room: `${path('M10 77V21L52 11L90 29V78L52 91Z','#f9e9c8')}${path('M52 11V60L10 77M52 60L90 78')}${rect(62,38,17,23,'#bed9dc')}`,
      lesson: `${path('M16 69V23M10 32L16 23L23 33M32 33H85M32 48H77M32 64H85')}${circle(79,78,8,'#f3c57c')}`,
      heart: path('M50 78C25 58 10 43 19 28Q32 11 50 29Q66 10 82 27C96 44 73 62 50 78Z','#eaa9a8'),
      health: `${rect(34,17,29,67,'#bfd8c4')}${rect(15,36,67,28,'#bfd8c4')}`,
      steps: `${path('M12 79H35V59H58V39H81V19H96')}${path('M15 27L37 16L61 24','none','stroke="#92b6a4"')}`,
      math: `${path('M15 30H41M28 17V43M63 23H86M63 37H86M22 65L39 82M39 65L22 82M64 72H86')}`,
      craft: `${path('M15 74L26 22L48 66Z','#dbbfd3')}${circle(73,36,18,'#f0ca83')}${rect(59,65,30,20,'#b9d9cf')}`,
      resources: notes, notes,
      campaign: `${circle(48,43,27,'#ffe2a0')}${circle(48,43,14,'#edb6a7')}${path('M48 43L78 17M70 16H82V29')}${line(16,83,88,83)}`,
      handshake: `${path('M9 47L28 26L50 37L71 26L94 47L69 72L50 65L31 73Z','#efc6a4')}${path('M28 26L47 45L63 34M50 65L65 51')}`,
      plan: notes, growth: `${bars}${path('M11 34L40 24L56 31L86 11M72 11H87V26')}`,
      event: `${rect(10,16,80,68,'#fff6e0')}${path('M10 33H90M30 8V23M69 8V23')}${circle(34,54,7,'#efb8a5')}${circle(67,68,7,'#a9c6c9')}`,
      news: `${rect(10,12,80,74,'#fff6df')}${rect(18,21,31,27,'#bfd8d7')}${line(57,24,81,24)}${line(57,36,81,36)}${line(18,60,81,60)}${line(18,73,70,73)}`,
      ledger: `${rect(13,12,72,76,'#fff9eb')}${path('M35 12V88M59 12V88M13 33H85M13 53H85M13 72H85')}`,
      budget: `${circle(48,43,25,'#eaca88')}${path('M48 24V63M60 32Q34 23 36 39Q36 46 50 45Q66 44 60 56Q55 63 35 56')}${line(16,82,85,82)}`,
      database: `<ellipse cx="50" cy="24" rx="31" ry="12" fill="#bbd6cd"/>${path('M19 24V75C19 91 81 91 81 75V24M19 49C19 65 81 65 81 49')}`,
      index: `${['A','B','C'].map((v,i)=>`${rect(11+i*26,18+i*10,24,57,['#efc998','#b6cdd6','#c4d7b8'][i])}`).join('')}`,
      time: `${circle(49,49,33,'#fff6df')}${path('M49 25V50L68 62')}`,
      route: `${path('M15 77C76 85 6 21 83 23','none','stroke-dasharray="5 5"')}${circle(15,77,8,'#b9d9cf')}${path('M83 39Q57 8 83 9Q108 9 83 39Z','#e9af96')}`,
      tax: `${notes}${circle(73,72,13,'#bdd6c1')}${path('M66 72l6 6l10-13')}`,
      calendar: `${rect(10,16,80,69,'#fff8e7')}${path('M10 33H90M29 8V23M70 8V23M35 33V85M62 33V85M10 58H90')}`
    };
    return `<g stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${drawings[mode] || notes}${variant?circle(89,91,3,'#dda593'):''}</g>`;
  }
  function tool(kind) {
    const icons = {
      oscilloscope: `${rect(0,3,112,77,'#94b3b9')}${rect(9,13,70,51,'#e0e9d8')}${path('M12 39H23L30 22L40 58L51 24L62 45H76')}${circle(94,27,6,'#efcc8b')}${circle(94,49,6,'#dfae98')}${path('M67 80Q91 109 111 78')}`,
      cnc: `${rect(0,-4,112,90,'#b6c5d0')}${rect(8,7,65,65,'#e2ece5')}${path('M40 7V35M28 36H52L45 48H36Z','#91a8b4')}${rect(19,59,44,12,'#d7ba8b')}${rect(80,7,24,26,'#758c9e')}${[0,1,2].map(i=>circle(86+i%2*12,43+Math.floor(i/2)*15,4,'#f1d394')).join('')}`,
      laptop: `${rect(0,9,112,69,'#a8c8cd',7)}${rect(7,16,98,53,'#fcf9ed',3)}${path('M-8 78H120L128 88H-16Z','#e4d8bc')}${path('M18 55L35 41L52 49L79 26','none','stroke="#739d9c" stroke-width="4"')}`,
      tablet: `${rect(4,0,102,81,'#afbbd1',8)}${rect(11,7,88,65,'#fff7e7',3)}${path('M27 55Q50 13 83 44L70 59Z','#dfbfce')}${path('M101 17L82 65','none','stroke="#d29b6a" stroke-width="6"')}`,
      clipboard: `${rect(16,-3,76,91,'#b9cdd0')}${rect(24,5,60,73,'#fff7e7')}${rect(38,-9,31,15,'#e8c785')}${path('M34 29H72M34 43H72M34 58H62')}`,
      calculator: `${rect(13,-4,67,88,'#abbfc2')}${rect(22,5,49,20,'#e6eed4')}${Array.from({length:9},(_,i)=>rect(23+(i%3)*16,36+Math.floor(i/3)*15,10,9,'#fff7e7',2)).join('')}${rect(87,25,23,58,'#f2dca7')}${line(93,34,105,34)}${line(93,44,105,44)}`,
      book: `${path('M-1 9Q27-2 55 12Q83-2 111 9V78Q80 68 55 80Q25 68-1 78Z','#fff7e7')}${path('M55 12V80M9 28Q31 22 44 29M9 42Q31 36 44 43M67 28Q85 22 100 29M67 43Q85 37 100 44')}`,
      chemistry: `${path('M13-4H42M19-4V29L0 69Q-4 83 28 83Q60 83 55 69L36 29V-4','#fff9eb')}${path('M8 54H48L55 69Q60 83 28 83Q-4 83 0 69Z','#b9d9c0')}${path('M83 1H101M88 1V65Q93 87 104 65V1','#f0cfc8')}${circle(26,47,3,'#ffe4a0')}${circle(25,65,4,'#fff9eb')}`,
      water: `${path('M29-8C-3 37-6 73 29 77C64 73 60 37 29-8Z','#accfd4')}${path('M82 15H109M87 15V69Q95 88 104 69V15','#fff9eb')}${path('M88 46H103V69Q95 88 88 69Z','#b9d9c0')}`,
      camera: `${rect(2,17,106,66,'#8397aa')}${rect(16,7,30,17,'#b6c5c8')}${circle(61,48,25,'#d7e2df')}${circle(61,48,15,'#73879c')}${circle(22,33,4,'#efd184')}${path('M26 87L12 116M81 87L97 116')}`,
      keyboard: `${rect(-2,33,116,49,'#728594')}${Array.from({length:8},(_,i)=>rect(4+i*13,40,12,35,'#fff7e7',1)).join('')}${[0,1,3,4,5].map(i=>rect(12+i*13,40,7,21,ink,1)).join('')}${path('M29 19V-9L51-15V9')}${circle(23,19,6,'#cbb4d4')}${circle(46,10,6,'#cbb4d4')}`,
      folders: `${[0,1,2].map((_,i)=>`${rect(5+i*32,4-i*4,29,79,['#e2c793','#bdd7c6','#bac9df'][i])}${rect(12+i*32,20-i*4,14,24,'#fff9eb',2)}`).join('')}`,
      server: `${rect(15,-8,85,94,'#8599a5')}${[0,1,2].map(i=>`${rect(22,2+i*28,70,21,'#d3e3dc')}${circle(33,13+i*28,3,'#9bb79b')}${line(47,12+i*28,79,12+i*28)}`).join('')}`,
      boxes: `${path('M2 38L30 22L59 38V79L30 94L2 79Z','#dfbc8e')}${path('M2 38L30 54L59 38M30 54V94')}${path('M57 9L81-6L112 9V51L84 66L57 51Z','#efd5ab')}${path('M57 9L84 25L112 9M84 25V66')}`,
      machine: `${rect(0,2,113,84,'#b9c9c7')}${rect(11,14,61,55,'#e6eddf')}${path('M42 15V35L53 45L42 54L31 45L42 35')}${rect(81,13,23,23,'#738ca0')}${circle(86,51,5,'#e3ac8f')}${circle(101,51,5,'#a9c49b')}`,
      circuit: `${rect(0,15,106,65,'#8fb6a0')}${rect(36,32,32,29,'#637b88')}${path('M36 40H16V26M36 51H10V69M68 40H89V23M68 53H96V73')}${circle(16,26,4,'#f4d58c')}${circle(96,73,4,'#f4d58c')}`,
      model: `${path('M9 36L52 9L101 34V75L57 99L9 75Z','#eacb9e')}${path('M9 36L57 60L101 34M57 60V99')}${path('M39 75V53L56 45L75 53V75L56 85Z','#b8cfd0')}`,
      caliper: `${path('M-2 42H113V53H-2Z','#b3c9ca')}${path('M13 42V13H27V42M72 42V17H86V67H72V53','#b3c9ca')}${rect(34,31,34,32,'#dce6d7')}${path('M43 44H58')}`,
      toolbox: `${rect(0,20,111,66,'#dfa48d')}${path('M32 20V7H77V20M0 41H111')}${rect(46,34,17,21,'#ffe2a0')}${path('M90 8L75-7M12 5L31-16','none','stroke="#829c9b" stroke-width="7"')}`,
      wood: `${rect(0,36,112,20,'#ddb57d')}${path('M11 45Q35 36 57 47T105 43','none','stroke="#a77e54"')}${path('M18 15L66-6L84 13L36 34Z','#adbfc0')}${path('M18 15L11 2L26-5L34 8Z','#d79b78')}`,
      interview: `${rect(3,34,32,45,'#f1dcb5')}${path('M0 43H37M12 23Q8 12 17 2')}${path('M53 0H107V39H76L64 50V39H53Z','#f9e9bf')}${path('M66 15H93M66 26H85')}`,
      therapy: `${circle(47,43,34,'#d1dcb4')}${path('M13 43H81M47 9Q26 42 47 77Q69 43 47 9')}${rect(84,24,15,45,'#a7bfd1')}${rect(76,37,32,14,'#a7bfd1')}`,
      palette: `${path('M11 18Q60-10 100 21Q122 62 84 81L60 63Q39 50 34 80Q-2 83 2 47Z','#ead3aa')}${circle(24,35,8,'#e3a79e')}${circle(48,20,8,'#e4c278')}${circle(80,29,8,'#a0c2c4')}${path('M85 75L109 8','none','stroke="#9c785b" stroke-width="6"')}`,
      megaphone: `${path('M12 24L66 3V75L12 54Z','#efbc95')}${rect(0,26,15,27,'#a7c5c4')}${path('M28 61L38 85L50 79L43 57','#adbdc7')}${path('M82 17L99 8M84 38H108M82 62L99 73')}`,
      contract: `${rect(5,-3,82,91,'#fff8e7')}${path('M19 17H70M19 30H70M19 43H51M20 68Q25 52 36 66T63 64')}${path('M85 70L108 9','none','stroke="#739c9b" stroke-width="7"')}`,
      flag: `${path('M23-8V93')}${path('M24-7Q55-23 86-7V33Q54 14 24 31Z','#ecb294')}${rect(54,66,56,20,'#c4d6bd')}`,
      shop: `${rect(4,29,105,56,'#fff0d2')}${path('M0 29L13 0H99L114 29Z','#efb0a1')}${path('M24 0L18 29M50 0V29M78 0L83 29','none','stroke="#fff4db" stroke-width="10"')}${rect(17,43,36,30,'#c6dadd')}${rect(67,42,25,43,'#dfc393')}`,
      calendar: `${rect(5,1,99,86,'#fff4dd')}${path('M5 22H104M28-7V9M81-7V9')}${path('M53 36L58 47L71 48L61 57L64 70L53 63L41 70L44 57L34 48L48 47Z','#edba83')}`,
      donation: `${rect(3,33,104,53,'#c0d5bc')}${path('M3 33L27 15H85L107 33M39 28H73')}${path('M56 10C27-10 39-28 56-16C76-29 84-9 56 10Z','#e7a6a0')}`,
      microphone: `${rect(35,-8,35,60,'#97aebb',17)}${path('M23 25V35Q23 67 53 67Q83 67 83 35V25M53 67V87M29 87H78')}${path('M42 7H62M42 18H62M42 29H62')}`
    };
    return `<g stroke="${ink}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icons[kind] || icons.clipboard}</g>`;
  }
  function avatar(type, label='') {
    return `<svg viewBox="0 0 240 260" role="img" aria-label="${label || LabData.types[type].animal}" xmlns="http://www.w3.org/2000/svg">${animal(type)}</svg>`;
  }
  function scene(type, career) {
    const [outfit, prop, backdrop] = sceneSpec[career.scene];
    const variant = Number(career.id.split('-')[1]);
    return `<svg class="work-scene" viewBox="0 0 480 350" role="img" aria-label="${LabData.types[type].animal}正在体验${career.name}：${career.work}" data-animal="${type}" data-scene="${career.scene}" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="477" height="347" rx="24" fill="#fff4dc" stroke="${ink}" stroke-width="2"/>
      <path d="M2 272H478V324Q478 348 454 348H26Q2 348 2 324Z" fill="#e7ead4"/>
      <circle cx="232" cy="152" r="111" fill="${LabData.types[type].color}" opacity=".48"/>
      <g transform="translate(29 41)"><rect width="105" height="107" rx="8" fill="#fffdf5" stroke="${ink}" stroke-width="2"/>${board(backdrop,variant%2)}</g>
      <g stroke="${ink}" stroke-width="2" stroke-linejoin="round"><path d="M377 81V37H440V81Z" fill="#cce3df"/><path d="M408 37V81M377 58H440" fill="none"/><path d="M366 92H450"/>
      <path d="M395 238L400 278H427L432 238Z" fill="#dfbd8e"/><path d="M414 242V195M414 225Q379 221 390 202Q413 202 414 225M414 218Q441 215 438 193Q417 194 414 218" fill="#a8c6a0"/></g>
      <g transform="translate(${prop==='interview'?143:155} 39) scale(.88)">${animal(type,outfit,prop==='interview'?'wave':'work')}</g>
      <g stroke="${ink}" stroke-width="3"><rect x="28" y="272" width="425" height="17" rx="6" fill="#deb988"/><path d="M52 289V333M430 289V333"/></g>
      <g transform="translate(${prop==='interview'?65:266} 187)">${tool(prop)}</g>
      <g stroke="${ink}" stroke-width="2"><rect x="46" y="239" width="45" height="33" rx="5" fill="#fff8e7"/><path d="M91 247Q111 246 104 260Q101 266 91 262" fill="none"/><path d="M58 226Q64 221 60 214M76 226Q82 221 78 214" fill="none" stroke="#a9b9b2"/></g>
      <path d="M153 311H311" stroke="#c2c6af" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }
  function face(level) {
    const mouths = ['M16 30Q24 21 32 30','M18 29Q24 25 30 29','M18 28H30','M17 25Q24 32 31 25','M16 24Q24 39 32 24Z'];
    return `<svg viewBox="0 0 48 44" aria-hidden="true"><g stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17L6 4L18 11M30 11L42 4L40 18" fill="#ffe6b1"/><ellipse cx="24" cy="24" rx="20" ry="17" fill="${['#ecddd8','#eee2bd','#f6e8ba','#cfe5cc','#ffcf96'][level-1]}"/><circle cx="16" cy="20" r="1.7" fill="${ink}"/><circle cx="32" cy="20" r="1.7" fill="${ink}"/>${path(mouths[level-1],level===5?'#e8a398':'none')}</g></svg>`;
  }
  return { avatar, scene, face, sceneSpec };
})();
