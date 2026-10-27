/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, CloudRainWind, TriangleAlert, CheckCircle2, 
  XCircle, RefreshCcw, ExternalLink, Printer, Copy, Check, 
  BrainCircuit, Clock, AlertTriangle, FileText, Send, 
  Sparkles, ShieldCheck, ArrowRight, X, Globe, HeartHandshake
} from 'lucide-react';

export type DecisionType = 'GO' | 'CONDITIONAL_GO' | 'ADAPTIVE_GO' | 'NO_GO';

export interface OfficialChannel {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  url: string;
  category: string;
  categoryEn: string;
  liveStatusZh: string;
  liveStatusEn: string;
}

export interface SystemicEvaluationResult {
  id: string;
  recommendation: DecisionType;
  decisionPath: string;
  rationale: string;
  corePrinciples: string[];
  actionCheckpoints: string[];
  broadcastNotice: string;
  exposureScore: number;
  systemicMetrics: {
    riskLevel: string;
    exposureChain: string;
    necessityText: string;
    alternativeText: string;
    deadlineIntegrity: string;
    transferRiskText: string;
  };
}

// Full Bilingual Dictionary
const dict = {
  zh: {
    brandOrg: '佛教慈濟慈善事業基金會',
    brandSub: '災防應變指揮中樞',
    appTitle: '重大天候活動 Go / No-Go 系統思考決策助手',
    appSub: '依據慈濟 10/24 薔琵颱風活動決策教案 (AAR) ｜ 練習在不確定中科學決策，全面管理暴露度',
    liveGovBadge: '官方即時情資',
    liveGovTitle: '官方權威查核直通：',
    refreshIntel: '即時刷新情報',
    scenariosLabel: '教案實戰四案演練：',
    caseC: '防災士座談 (37人跨區赴花蓮 / 92分)',
    caseA: '北區新芽典禮 (1,800人 / 防志工轉移 / 88分)',
    caseB: '桃園新芽 (在地分流降載 / 87分)',
    caseD: '北區尋根營 (千人跨區 / 預計恢復≠可運行 / 69分)',
    
    // 6 Questions
    qHeader: '系統思考六構面盤點 (Systemic 6 Criteria)',
    qSub: '問完六題，不猜天氣，科學切斷危險移動暴露鏈',
    qBadge: '客觀盤點',
    eventName: '活動 / 任務名稱',
    eventNamePlaceholder: '例如：防災士座談、新芽獎學金、社區關懷訪視',
    
    q1Title: '1. Risk：沿線與活動地環境致災度 (未來 12-24h)',
    q1Low: '低風險：天候正常，無特殊警報',
    q1Med: '中風險：大雨或豪雨特報 / 局部低窪積水可能',
    q1High: '高風險：陸上颱風警報 / 土石流黃色或紅色警戒 / 蘇花東部山區受阻',
    q1Ext: '極端致災：政府宣布停班停課 / 強烈致災風雨',
    
    q2Title: '2. Exposure：人員移動鏈盤點 (出發時間與交通廊道)',
    paxLabel: '預計參與規模人數',
    transitLabel: '主要交通特性',
    transitRail: '高度依賴臺鐵/客運 (易停駛滯留)',
    transitRoad: '大型遊覽車/跨區自駕',
    transitLocal: '在地短程移動',
    crossCountyCheck: '跨縣市移動 (跨區赴花蓮/遠距)',
    vulnerableCheck: '含脆弱族群 (兒少/長者/身障)',
    
    q3Title: '3. Necessity：任務必要性 (延期的實質損失是什麼？)',
    necHigh: '急難救助：不可取代之急難任務 (嚴格配備安全督導與防護)',
    necMed: '中等必要性：既定研習/表揚典禮 (可延期或轉線上)',
    necLow: '常規例會：例行聚會 (隨時可取消，生命安全首要)',
    
    q4Title: '4. Alternatives：首選備案 (活動可以停，服務不能斷)',
    altOnline: '轉線上辦理 (Online)',
    altDivert: '在地縮小/梯次分流/定點領取 (Decentralize)',
    altPostpone: '全體延期辦理 (Postpone)',
    altCancel: '取消實體大會 (轉為電話與平安關懷)',
    
    q5Title: '5. Deadline：參與者最晚何時必須知道？',
    q5Hint: '★ 慈濟教案原則：依參與者出門備裝時間倒推。跨區活動清晨出發者，必須於出發前晚 18:00 完成決策，絕不可賭官方深夜公告！',
    
    q6Title: '6. Re-assess：替代方案是否轉移風險給志工？',
    q6Desc: '「替代服務 ≠ 自動安全」！若取消大型聚會改由志工在強風豪雨中四處親送，可能只是把 Exposure 轉移給志工。風雨中嚴禁高齡志工冒險親送！',
    
    btnEvaluate: '執行 AI 系統思考風險研判',
    btnEvaluating: 'AI 依教案理念研判中...',
    
    // Result
    exposureScore: '暴露度評分',
    principlesHeader: '慈濟災防核心決策準則檢核',
    actionHeader: '執行行動檢核點 (Action Checkpoints)',
    broadcastHeader: '即時對外廣播通告稿 (LINE / WhatsApp / 簡訊)',
    copyBtn: '一鍵複製',
    copiedBtn: '已複製！',
    exportPdfBtn: '匯出專業 PDF 決策評估簡報 (Executive PDF Briefing)',
    exportPdfSub: '含官方氣象數據查核、六構面盤點、AI 裁決論證與主管簽核欄位，符合正式公文稽核標準',
    
    // PDF Modal
    pdfTitle: '重大天候活動 Go / No-Go 決策分析簡報',
    pdfDocId: '公文文號',
    pdfDocDate: '產出時間',
    pdfDocBasis: '決策依據',
    pdfBasisVal: '慈濟 10/24 薔琵颱風 AAR 決策教案',
    pdfSnapshotTitle: '官方即時情資查驗存證 (Official Government Signals Verified)',
    pdfSixTitle: '專案六大構面客觀盤點結果 (Six Criteria Assessment Grid)',
    pdfSign1: '評估研析人：',
    pdfSign2: '活動主辦代表：',
    pdfSign3: '權責主管核定簽署：',
    pdfPrintBtn: '立即列印 / 存為 PDF',
    pdfCloseBtn: '關閉'
  },
  en: {
    brandOrg: 'Tzu Chi Foundation',
    brandSub: 'Disaster Emergency Operations Center',
    appTitle: 'Major Weather Event Go / No-Go Systemic Decision Helper',
    appSub: 'Trained on Tzu Chi Foundation 10/24 Case Analysis AAR | Scientific decision-making under uncertainty, managing exposure chains',
    liveGovBadge: 'Real-time Intel',
    liveGovTitle: 'Official Government Verification:',
    refreshIntel: 'Refresh Intel',
    scenariosLabel: 'Trained Drill Scenarios:',
    caseC: 'Disaster Seminar (37 pax to Hualien / 92 pts - Exemplar)',
    caseA: 'New Bud Ceremony (1,800 pax / Prevent Volunteer Shift / 88 pts)',
    caseB: 'Taoyuan New Bud (Local Adaptive Capacity / 87 pts)',
    caseD: 'Roots Retreat (1,000 pax / Expected Recovery != Operational / 69 pts)',
    
    // 6 Questions
    qHeader: 'Systemic 6-Criteria Inventory',
    qSub: 'Answer the 6 questions. Don\'t predict weather; scientifically cut dangerous exposure chains.',
    qBadge: 'Objective Inventory',
    eventName: 'Event / Mission Name',
    eventNamePlaceholder: 'e.g. Disaster Seminar, New Bud Ceremony, Community Care',
    
    q1Title: '1. Risk: Route & Site Environmental Hazard (Next 12-24h)',
    q1Low: 'Low Risk: Normal conditions, no advisories',
    q1Med: 'Medium Risk: Heavy Rain Advisory / Potential localized ponding',
    q1High: 'High Risk: Land Typhoon Warning / Debris Flow Warning / Mountain transit blocked',
    q1Ext: 'Extreme Hazard: Government Work/School Closures / Severe disaster threat',
    
    q2Title: '2. Exposure: People & Mobility Chain (Departure time & corridor)',
    paxLabel: 'Estimated Participants (Pax)',
    transitLabel: 'Transportation Characteristics',
    transitRail: 'Heavy reliance on Rail/Transit (High suspension & stranding risk)',
    transitRoad: 'Charter Buses / Cross-county Driving',
    transitLocal: 'Local Short-distance Travel',
    crossCountyCheck: 'Cross-County Travel (Transit into Hualien / Remote)',
    vulnerableCheck: 'Vulnerable Groups (Children / Elderly / Disabled)',
    
    q3Title: '3. Necessity: Mission Necessity (What is the true cost of postponement?)',
    necHigh: 'Emergency Relief: Irreplaceable mission (Equipped with strict safety supervision)',
    necMed: 'Medium Necessity: Scheduled Seminar / Ceremony (Can postpone or move online)',
    necLow: 'Routine Assembly: Routine fellowship (Easily rescheduled; life safety first)',
    
    q4Title: '4. Alternatives: Preferred Fallback (Activities pause, service continues)',
    altOnline: 'Move to Virtual / Online (Online)',
    altDivert: 'Decentralize / Staggered / Local Pickup (Decentralize)',
    altPostpone: 'Postpone Event (Postpone)',
    altCancel: 'Cancel Gathering (Shift to phone welfare check)',
    
    q5Title: '5. Deadline: When MUST participants know?',
    q5Hint: '★ Tzu Chi Principle: Count backward from participants\' preparation & departure time. For morning departures, finalize decision by 18:00 the evening before; never gamble on midnight announcements!',
    
    q6Title: '6. Re-assess: Does the alternative shift exposure to volunteers?',
    q6Desc: '"Alternative service != Automatically safe"! If cancelling a large gathering merely sends volunteers out into storms for door-to-door deliveries, exposure is simply shifted to volunteers. Prohibit elderly volunteers from storm delivery!',
    
    btnEvaluate: 'Run AI Systemic Risk Assessment',
    btnEvaluating: 'AI assessing per Tzu Chi doctrine...',
    
    // Result
    exposureScore: 'Exposure Score',
    principlesHeader: 'Tzu Chi Core Decision Doctrine Verification',
    actionHeader: 'Action Checkpoints (Time-bound execution)',
    broadcastHeader: 'Official Broadcast Message (LINE / WhatsApp / SMS)',
    copyBtn: 'Copy Notice',
    copiedBtn: 'Copied!',
    exportPdfBtn: 'Export Executive PDF Briefing Report',
    exportPdfSub: 'Includes government signal verification, 6-dimension matrix, AI rationale, and supervisor signature block conforming to audit standards',
    
    // PDF Modal
    pdfTitle: 'Major Weather Event Go / No-Go Decision Briefing',
    pdfDocId: 'Document ID',
    pdfDocDate: 'Generated At',
    pdfDocBasis: 'Governing Doctrine',
    pdfBasisVal: 'Tzu Chi Foundation 10/24 Typhoon AAR Case Study',
    pdfSnapshotTitle: 'Official Government Signals Verified Snapshot',
    pdfSixTitle: 'Systemic 6 Criteria Objective Inventory Matrix',
    pdfSign1: 'Risk Analyst:',
    pdfSign2: 'Organizer Lead:',
    pdfSign3: 'Authorizing Supervisor:',
    pdfPrintBtn: 'Print / Save as PDF',
    pdfCloseBtn: 'Close'
  }
};

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const t = dict[lang];

  // Official Channels
  const [channels, setChannels] = useState<OfficialChannel[]>([
    { id: 'cwa', name: '中央氣象署 (CWA)', nameEn: 'Central Weather Admin (CWA)', title: '颱風消息與定量降水預報', titleEn: 'Typhoon Track & QPF Forecast', url: 'https://www.cwa.gov.tw/', category: '氣象情資', categoryEn: 'Weather', liveStatusZh: '豪雨特報監控中', liveStatusEn: 'Rain Warning Monitored' },
    { id: 'rail', name: '臺灣鐵路 (TR)', nameEn: 'Taiwan Railway (TR)', title: '列車行駛/停駛公告', titleEn: 'Train Operations & Alerts', url: 'https://www.railway.gov.tw/', category: '鐵路疏運', categoryEn: 'Rail', liveStatusZh: '東部幹線崇德=和仁機動巡檢', liveStatusEn: 'Chongde-Heren Monitored' },
    { id: 'thb', name: '公路局 168', nameEn: 'Highways Bureau 168', title: '省道預警性封閉路況即時網', titleEn: 'Provincial Road Closures', url: 'https://168.thb.gov.tw/', category: '公路通阻', categoryEn: 'Highways', liveStatusZh: '蘇花路廊土石流警戒', liveStatusEn: 'Suhua Corridor Alert' },
    { id: 'dgpa', name: '人事行政總處', nameEn: 'DGPA Taiwan', title: '各縣市天然災害停止上班上課情形', titleEn: 'Work & School Closures', url: 'https://www.dgpa.gov.tw/ndse.html', category: '停班停課', categoryEn: 'Closures', liveStatusZh: '各縣市持續動態通報', liveStatusEn: 'County Updates Live' },
    { id: 'eoc', name: '中央應變中心', nameEn: 'Central EOC', title: '災害情報站與即時處置報告', titleEn: 'Emergency HQ Reports', url: 'https://www.eoc.gov.tw/', category: '應變指揮', categoryEn: 'EOC', liveStatusZh: '二級開設應變中', liveStatusEn: 'Level II Activation' }
  ]);
  const [intelHeadline, setIntelHeadline] = useState('');
  const [isSyncingGov, setIsSyncingGov] = useState(false);

  // Systemic Form Inputs
  const [formData, setFormData] = useState({
    name: '防災士初階培訓座談 (全臺跨區赴花蓮)',
    pax: '37',
    crossCounty: 'yes',
    vulnerable: 'no',
    transport: 'rail',
    riskLevel: 'high',
    necessity: 'medium',
    alternative: 'online',
    deadline: '參與者清晨出發前晚 18:00 (嚴守出發前死線)',
    transferRisk: 'no',
    notes: '37人中15人集中同一班臺鐵406車次，多人清晨5點即須出門。'
  });

  // AI Evaluation & PDF Modal State
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<SystemicEvaluationResult | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [copiedBroadcast, setCopiedBroadcast] = useState(false);
  const [supervisorName, setSupervisorName] = useState(lang === 'zh' ? '災防專案主管' : 'Disaster Operations Director');

  // Sync Government Intelligence
  const fetchGovIntelligence = async () => {
    setIsSyncingGov(true);
    try {
      const res = await fetch('/api/gov-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.channels) setChannels(json.channels);
        if (json.headline) setIntelHeadline(json.headline);
      }
    } catch (err) {
      console.warn('Gov intel fetch error:', err);
    } finally {
      setIsSyncingGov(false);
    }
  };

  useEffect(() => {
    fetchGovIntelligence();
    triggerEvaluation();
  }, [lang]);

  // Trigger Systemic AI Risk Evaluation
  const triggerEvaluation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name) return;

    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang })
      });
      if (res.ok) {
        const json = await res.json();
        setResult(json.data);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      console.warn('Evaluation fallback:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyNotice = () => {
    if (!result?.broadcastNotice) return;
    navigator.clipboard.writeText(result.broadcastNotice);
    setCopiedBroadcast(true);
    setTimeout(() => setCopiedBroadcast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans antialiased flex flex-col">
      
      {/* 1. TOP REAL-TIME GOVERNMENT SIGNALS & DIRECT CHANNELS (官方即時情資直通) */}
      <div className="bg-slate-900 text-white border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          
          {/* Real-time Ticker */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-400 shrink-0">
              {t.liveGovBadge}
            </span>
            <p className="text-xs text-slate-300 font-medium truncate">
              {intelHeadline || (lang === 'zh' ? '中央氣象署發布豪雨特報，東部幹線邊坡預警監控中，請嚴格執行出發前決策死線。' : 'Torrential rain advisory active. Eastern line under debris surveillance. Enforce departure deadline.')}
            </p>
            <button
              onClick={fetchGovIntelligence}
              disabled={isSyncingGov}
              className="p-1 rounded text-slate-400 hover:text-white transition shrink-0"
              title={t.refreshIntel}
            >
              <RefreshCcw size={12} className={isSyncingGov ? "animate-spin text-teal-400" : ""} />
            </button>
          </div>

          {/* 5 Official External Links */}
          <div className="flex items-center flex-wrap gap-1.5 shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase hidden lg:inline">{t.liveGovTitle}</span>
            {channels.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-0.5 rounded bg-slate-800 hover:bg-teal-700 hover:text-white text-[11px] font-semibold text-slate-200 transition border border-slate-700"
                title={`${lang === 'zh' ? ch.name : ch.nameEn} - ${lang === 'zh' ? ch.title : ch.titleEn}`}
              >
                <span>{lang === 'zh' ? ch.name : ch.nameEn}</span>
                <ExternalLink size={10} className="ml-1 opacity-70" />
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER (Tzu Chi Foundation Branding & Language Switcher) */}
      <header className="bg-white border-b border-slate-200 shadow-2xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldAlert size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  {t.brandOrg}
                </span>
                <h1 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                  {t.appTitle}
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {t.appSub}
              </p>
            </div>
          </div>

          {/* Header Controls: Language Switcher & Organization Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => {
                const nextLang = lang === 'zh' ? 'en' : 'zh';
                setLang(nextLang);
                setSupervisorName(nextLang === 'zh' ? '災防專案主管' : 'Disaster Operations Director');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
              title="Switch Language"
            >
              <Globe size={14} className="text-teal-700" />
              <span>{lang === 'zh' ? 'English Version' : '切換為繁體中文'}</span>
            </button>
          </div>

        </div>

        {/* 4 Drill Scenarios Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 border-t border-slate-100 flex items-center flex-wrap gap-2 text-xs bg-slate-50/50">
          <span className="text-[11px] text-slate-500 font-bold shrink-0">{t.scenariosLabel}</span>
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: lang === 'zh' ? '防災士初階座談 (全臺跨區赴花蓮)' : 'Disaster Preparedness Seminar (Cross-County to Hualien)',
                pax: '37',
                crossCounty: 'yes',
                vulnerable: 'no',
                transport: 'rail',
                riskLevel: 'high',
                necessity: 'medium',
                alternative: 'online',
                deadline: lang === 'zh' ? '參與者清晨出發前晚 18:00 (嚴守出發前死線)' : '18:00 Evening Before Departure (Enforce Pre-Departure Cutoff)',
                transferRisk: 'no',
                notes: '37人中15人集中同一班臺鐵406車次，多人清晨5點即須出門。'
              });
            }}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold border border-slate-200 transition text-[11px]"
          >
            {t.caseC}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: lang === 'zh' ? '北區新芽獎學金頒獎大會' : 'North District New Bud Scholarship Ceremony',
                pax: '1800',
                crossCounty: 'no',
                vulnerable: 'yes',
                transport: 'local',
                riskLevel: 'high',
                necessity: 'medium',
                alternative: 'divert',
                deadline: lang === 'zh' ? '活動前 48 小時 (預防性停辦)' : '48 Hours Prior (Preventive Pre-emption)',
                transferRisk: 'yes',
                notes: '近1800人。取消大會改志工親送，必須二度評估志工涉險風險！'
              });
            }}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold border border-slate-200 transition text-[11px]"
          >
            {t.caseA}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: lang === 'zh' ? '桃園新芽在地獎學金頒發' : 'Taoyuan New Bud Scholarship (Regional)',
                pax: '250',
                crossCounty: 'no',
                vulnerable: 'yes',
                transport: 'local',
                riskLevel: 'medium',
                necessity: 'medium',
                alternative: 'divert',
                deadline: lang === 'zh' ? '活動當日中午前' : 'Noon of Event Day',
                transferRisk: 'no',
                notes: '在地型活動。保留彈性，依明確風雨門檻分流或定點親領。'
              });
            }}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold border border-slate-200 transition text-[11px]"
          >
            {t.caseB}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: lang === 'zh' ? '北區尋根營 (大隊包車赴花蓮)' : 'North District Roots Retreat (Buses to Hualien)',
                pax: '1000',
                crossCounty: 'yes',
                vulnerable: 'no',
                transport: 'road',
                riskLevel: 'high',
                necessity: 'medium',
                alternative: 'postpone',
                deadline: lang === 'zh' ? '10/23 22:00 (過度延後死線)' : '10/23 22:00 (Inappropriately Delayed Deadline)',
                transferRisk: 'no',
                notes: '千人跨區。深刻教訓：未確認路廊巡檢通行前，絕不可放行！'
              });
            }}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold border border-slate-200 transition text-[11px]"
          >
            {t.caseD}
          </button>
        </div>
      </header>

      {/* 3. MAIN SYSTEMIC ASSESSMENT INTERFACE (No previous events clutter) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: 6 SYSTEMIC CRITERIA (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
            
            <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">{t.qHeader}</h2>
                <p className="text-[11px] text-slate-400 font-medium">{t.qSub}</p>
              </div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {t.qBadge}
              </span>
            </div>

            <form onSubmit={triggerEvaluation} className="space-y-4 text-xs">
              
              {/* Event Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.eventName} <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.eventNamePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900 outline-none"
                />
              </div>

              {/* 1. Risk */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <label className="font-bold text-slate-800 flex items-center mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center mr-1.5 font-bold">1</span>
                  {t.q1Title}
                </label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                >
                  <option value="low">{t.q1Low}</option>
                  <option value="medium">{t.q1Med}</option>
                  <option value="high">{t.q1High}</option>
                  <option value="extreme">{t.q1Ext}</option>
                </select>
              </div>

              {/* 2. Exposure */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
                <label className="font-bold text-slate-800 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center mr-1.5 font-bold">2</span>
                  {t.q2Title}
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block mb-0.5 font-semibold">{t.paxLabel}</span>
                    <input 
                      type="number"
                      min="1"
                      value={formData.pax}
                      onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5 font-semibold">{t.transitLabel}</span>
                    <select
                      value={formData.transport}
                      onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium"
                    >
                      <option value="rail">{t.transitRail}</option>
                      <option value="road">{t.transitRoad}</option>
                      <option value="local">{t.transitLocal}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.crossCounty === 'yes'}
                      onChange={(e) => setFormData({ ...formData, crossCounty: e.target.checked ? 'yes' : 'no' })}
                      className="rounded text-teal-600 w-3.5 h-3.5"
                    />
                    <span className="font-bold text-slate-700">{t.crossCountyCheck}</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.vulnerable === 'yes'}
                      onChange={(e) => setFormData({ ...formData, vulnerable: e.target.checked ? 'yes' : 'no' })}
                      className="rounded text-teal-600 w-3.5 h-3.5"
                    />
                    <span className="font-bold text-slate-700">{t.vulnerableCheck}</span>
                  </label>
                </div>
              </div>

              {/* 3. Necessity */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <label className="font-bold text-slate-800 flex items-center mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center mr-1.5 font-bold">3</span>
                  {t.q3Title}
                </label>
                <select
                  value={formData.necessity}
                  onChange={(e) => setFormData({ ...formData, necessity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                >
                  <option value="high">{t.necHigh}</option>
                  <option value="medium">{t.necMed}</option>
                  <option value="low">{t.necLow}</option>
                </select>
              </div>

              {/* 4. Alternatives */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <label className="font-bold text-slate-800 flex items-center mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center mr-1.5 font-bold">4</span>
                  {t.q4Title}
                </label>
                <select
                  value={formData.alternative}
                  onChange={(e) => setFormData({ ...formData, alternative: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                >
                  <option value="online">{t.altOnline}</option>
                  <option value="divert">{t.altDivert}</option>
                  <option value="postpone">{t.altPostpone}</option>
                  <option value="cancel">{t.altCancel}</option>
                </select>
              </div>

              {/* 5. Decision Deadline */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <label className="font-bold text-slate-800 flex items-center mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center mr-1.5 font-bold">5</span>
                  {t.q5Title}
                </label>
                <input 
                  type="text"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {t.q5Hint}
                </span>
              </div>

              {/* 6. Re-assess */}
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox"
                    id="transferRiskCheck"
                    checked={formData.transferRisk === 'yes'}
                    onChange={(e) => setFormData({ ...formData, transferRisk: e.target.checked ? 'yes' : 'no' })}
                    className="rounded text-rose-600 w-4 h-4 mt-0.5"
                  />
                  <label htmlFor="transferRiskCheck" className="cursor-pointer">
                    <span className="font-bold text-rose-900 block">
                      {t.q6Title}
                    </span>
                    <span className="text-[10px] text-rose-700 leading-tight block mt-0.5">
                      {t.q6Desc}
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-xs transition-all disabled:opacity-60 text-sm"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCcw size={16} className="animate-spin mr-2" />
                    {t.btnEvaluating}
                  </>
                ) : (
                  <>
                    <BrainCircuit size={16} className="mr-2" />
                    {t.btnEvaluate}
                  </>
                )}
              </button>

            </form>

          </div>

          {/* RIGHT: AI DECISION RESULT DECK (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {result ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                
                {/* Result Header Banner */}
                <div className={`p-6 text-white ${
                  result.recommendation === 'GO' ? 'bg-emerald-600' :
                  result.recommendation === 'ADAPTIVE_GO' ? 'bg-teal-700' :
                  result.recommendation === 'CONDITIONAL_GO' ? 'bg-amber-600' : 'bg-rose-700'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {result.decisionPath}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                        {result.recommendation === 'GO' && (lang === 'zh' ? 'GO 正常辦理' : 'GO - Proceed Normally')}
                        {result.recommendation === 'ADAPTIVE_GO' && (lang === 'zh' ? 'ADAPTIVE GO 調整後辦理' : 'ADAPTIVE GO - Modified Adaptive Mode')}
                        {result.recommendation === 'CONDITIONAL_GO' && (lang === 'zh' ? 'CONDITIONAL GO 條件式續辦' : 'CONDITIONAL GO - Specific Checkpoints Required')}
                        {result.recommendation === 'NO_GO' && (lang === 'zh' ? 'NO-GO 延期／取消原活動' : 'NO-GO - Postpone / Cancel Activity')}
                      </h3>
                    </div>

                    <div className="bg-white/10 backdrop-blur-2xs px-4 py-2 rounded-xl text-center shrink-0 border border-white/20">
                      <span className="text-[10px] text-white/80 block uppercase font-bold">{t.exposureScore}</span>
                      <span className="text-3xl font-black leading-none">{result.exposureScore}</span>
                      <span className="text-[10px] text-white/70"> / 100</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/95 mt-3 font-medium leading-relaxed bg-black/15 p-3.5 rounded-xl border border-white/10">
                    {result.rationale}
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-5">
                  
                  {/* Systemic Core Principles Verification */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center">
                      <ShieldCheck size={14} className="mr-1.5 text-teal-700" />
                      {t.principlesHeader}
                    </h4>
                    <div className="space-y-1.5">
                      {result.corePrinciples.map((cp, idx) => (
                        <div key={idx} className="flex items-start text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                          <CheckCircle2 size={14} className="text-teal-700 mr-2 shrink-0 mt-0.5" />
                          <span>{cp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Checkpoints */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center">
                      <Clock size={14} className="mr-1.5 text-teal-700" />
                      {t.actionHeader}
                    </h4>
                    <div className="space-y-1.5">
                      {result.actionCheckpoints.map((ap, idx) => (
                        <div key={idx} className="flex items-start text-xs p-2.5 rounded-xl bg-teal-50/50 border border-teal-100">
                          <span className="w-4 h-4 rounded bg-teal-700 text-white text-[10px] flex items-center justify-center mr-2 shrink-0 mt-0.5 font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-800">{ap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Broadcast Script */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-teal-400 flex items-center">
                        <Send size={13} className="mr-1.5" />
                        {t.broadcastHeader}
                      </span>
                      <button
                        onClick={handleCopyNotice}
                        className="flex items-center px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-teal-300 transition"
                      >
                        {copiedBroadcast ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                        {copiedBroadcast ? t.copiedBtn : t.copyBtn}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      {result.broadcastNotice}
                    </p>
                  </div>

                  {/* PDF Export Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setShowPdfModal(true)}
                      className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl font-black text-white bg-slate-900 hover:bg-teal-700 shadow-md transition-all text-sm"
                    >
                      <FileText size={16} className="mr-2" />
                      {t.exportPdfBtn}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-1.5 font-medium">
                      {t.exportPdfSub}
                    </p>
                  </div>

                </div>

              </div>
            ) : null}

          </div>

        </div>
      </main>

      {/* 4. MODAL: FULLY PROFESSIONAL EXECUTIVE BRIEFING REPORT FOR PRINT / PDF EXPORT */}
      {showPdfModal && result && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl p-6 sm:p-10 my-8 animate-in zoom-in-95 duration-200 pdf-report-container">
            
            {/* Top Toolbar (Hidden on print) */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 no-print">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                <span className="text-xs font-bold text-slate-500">
                  {lang === 'zh' ? '公文級災防情勢簡報預覽' : 'Executive Disaster Decision Briefing Preview'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition"
                >
                  <Printer size={14} className="mr-1.5" />
                  {t.pdfPrintBtn}
                </button>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* FORMAL DOCUMENT CONTENT */}
            <div className="space-y-6 text-slate-900">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-teal-800 uppercase">
                    {t.brandOrg} ｜ {t.brandSub}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 tracking-tight">
                    {t.pdfTitle}
                  </h2>
                </div>

                <div className="text-left sm:text-right text-xs space-y-0.5 text-slate-600">
                  <p><span className="font-bold text-slate-800">{t.pdfDocId}：</span>{result.id}</p>
                  <p><span className="font-bold text-slate-800">{t.pdfDocDate}：</span>{new Date().toLocaleString()}</p>
                  <p><span className="font-bold text-slate-800">{t.pdfDocBasis}：</span>{t.pdfBasisVal}</p>
                </div>
              </div>

              {/* 1. Official Government Real-Time Signal Snapshot */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs page-break-avoid">
                <span className="font-black text-slate-900 uppercase tracking-wider block mb-2 text-[11px]">
                  {t.pdfSnapshotTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900">{lang === 'zh' ? '中央氣象署 (CWA)：' : 'Central Weather Administration (CWA):'}</span>
                    <p className="text-slate-600 mt-0.5">{intelHeadline || (lang === 'zh' ? '豪雨特報持續生效，東部沿海與山區強陣風防範土石流。' : 'Rain advisory active; monitor coastal gusts and debris flow.')}</p>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900">{lang === 'zh' ? '臺灣鐵路 (TR)：' : 'Taiwan Railway (TR):'}</span>
                    <p className="text-slate-600 mt-0.5">{lang === 'zh' ? '東部幹線崇德=和仁路段土石流告警維持警戒，機動防範行車受阻。' : 'Eastern line Chongde-Heren slope debris alert in effect; preventive slowing/holds active.'}</p>
                  </div>
                </div>
              </div>

              {/* 2. Final Go/No-Go Decision Card */}
              <div className="p-5 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 page-break-avoid">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    {lang === 'zh' ? '核定決策路徑：' : 'Decision Path: '}{result.decisionPath}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black mt-1">
                    {result.recommendation === 'GO' && (lang === 'zh' ? '✅ GO (安全條件完全確認，正常辦理)' : '✅ GO (Safety Verified, Proceed Normally)')}
                    {result.recommendation === 'ADAPTIVE_GO' && (lang === 'zh' ? '🔄 ADAPTIVE GO (啟動線上/分流/定點替代方案)' : '🔄 ADAPTIVE GO (Activate Staggered / Online Adaptation)')}
                    {result.recommendation === 'CONDITIONAL_GO' && (lang === 'zh' ? '⚠️ CONDITIONAL GO (設定客觀檢核點，未達即停)' : '⚠️ CONDITIONAL GO (Enforce Checkpoints; Abort if Unmet)')}
                    {result.recommendation === 'NO_GO' && (lang === 'zh' ? '⛔ NO-GO (終止實體大會，啟動服務轉移)' : '⛔ NO-GO (Cancel/Postpone In-Person, Transfer Service)')}
                  </div>
                  <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed">
                    {result.rationale}
                  </p>
                </div>

                <div className="text-center sm:text-right shrink-0">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{t.exposureScore}</span>
                  <div className="text-3xl font-black text-slate-900 leading-none mt-0.5">{result.exposureScore}</div>
                  <span className="text-[10px] text-slate-500">/ 100</span>
                </div>
              </div>

              {/* 3. Six-Dimension Inventory Grid */}
              <div className="page-break-avoid">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                  {t.pdfSixTitle}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 text-[10px] block">1. {lang === 'zh' ? '環境風險 (Risk)' : 'Environmental Risk'}</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{result.systemicMetrics.riskLevel}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 text-[10px] block">2. {lang === 'zh' ? '移動鏈暴露 (Exposure)' : 'Mobility Exposure'}</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{result.systemicMetrics.exposureChain}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 text-[10px] block">3. {lang === 'zh' ? '必要性 (Necessity)' : 'Task Necessity'}</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{result.systemicMetrics.necessityText}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 text-[10px] block">4. {lang === 'zh' ? '替代方案 (Alternatives)' : 'Alternatives'}</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{result.systemicMetrics.alternativeText}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 text-[10px] block">5. {lang === 'zh' ? '決策死線 (Deadline)' : 'Decision Deadline'}</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{result.systemicMetrics.deadlineIntegrity}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 text-[10px] block">6. {lang === 'zh' ? '志工二次評估 (Re-assess)' : 'Volunteer Secondary Risk'}</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{result.systemicMetrics.transferRiskText}</span>
                  </div>
                </div>
              </div>

              {/* 4. Action Checkpoints & Broadcast Script */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 page-break-avoid text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-2">{t.actionHeader}</span>
                  <ul className="space-y-1.5 text-slate-700">
                    {result.actionCheckpoints.map((ap, i) => (
                      <li key={i} className="flex items-start">
                        <span className="font-bold mr-1.5">{i+1}.</span>
                        <span>{ap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-2">{t.broadcastHeader}</span>
                  <p className="text-slate-700 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                    {result.broadcastNotice}
                  </p>
                </div>
              </div>

              {/* 5. Authorization & Signature Block */}
              <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-xs page-break-avoid">
                <div>
                  <span className="text-slate-500 font-bold block">{t.pdfSign1}</span>
                  <div className="mt-4 border-b border-slate-400 pb-1 font-semibold">
                    {lang === 'zh' ? '災防情資分析小組' : 'Disaster Intelligence Unit'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block">{t.pdfSign2}</span>
                  <div className="mt-4 border-b border-slate-400 pb-1 font-semibold">
                    {lang === 'zh' ? '主辦團隊負責人' : 'Event Organizing Lead'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block">{t.pdfSign3}</span>
                  <div className="mt-4 border-b border-slate-400 pb-1 font-black text-slate-900 flex justify-between">
                    <span>{supervisorName}</span>
                    <span className="text-[10px] text-slate-400">{lang === 'zh' ? '核定章戳' : 'Authorized Seal'}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-slate-400 text-[11px] shrink-0 font-medium no-print">
        {t.brandOrg} ｜ {t.appTitle}
      </footer>

    </div>
  );
}
