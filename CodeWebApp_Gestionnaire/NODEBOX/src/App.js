import React, { useState, useRef } from "react";
import {
  Map,
  Users,
  Calendar,
  Settings,
  BarChart3,
  RefreshCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageSquare,
  Send,
  Radio,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Focus,
  GripVertical,
  UserX,
  UserCheck,
  UserPlus,
} from "lucide-react";

// --- DATA INITIALE: ÉQUIPES & EMPLOYÉS ---
const initialTeams = [
  {
    id: "rouge",
    name: "Équipe Rouge",
    color: "bg-red-100 text-red-800 border-red-300",
    dot: "bg-red-700",
  },
  {
    id: "bleue",
    name: "Équipe Bleue",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    dot: "bg-blue-600",
  },
  {
    id: "verte",
    name: "Équipe Verte",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    dot: "bg-emerald-600",
  },
  {
    id: "jaune",
    name: "Équipe Jaune",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    dot: "bg-yellow-500",
  },
  {
    id: "violette",
    name: "Équipe Violette",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    dot: "bg-purple-600",
  },
  {
    id: "orange",
    name: "Équipe Orange",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    dot: "bg-orange-600",
  },
];

const initialEmployees = [
  { id: "e1", name: "Jean Dupont", teamId: "rouge", status: "present" },
  { id: "e2", name: "Sophie Martin", teamId: "rouge", status: "present" },
  { id: "e3", name: "Marc Lefèvre", teamId: "rouge", status: "present" },
  { id: "e4", name: "Claire Bernard", teamId: "rouge", status: "present" },
  { id: "e5", name: "Luc Moraud", teamId: "rouge", status: "present" },
  { id: "e6", name: "Thomas Dubois", teamId: "bleue", status: "absent" },
  { id: "e7", name: "Marie Leroy", teamId: "bleue", status: "absent" },
  { id: "e8", name: "Antoine Roux", teamId: "bleue", status: "absent" },
  { id: "e9", name: "Camille Fontaine", teamId: "bleue", status: "present" },
  { id: "e10", name: "Hugo Mercier", teamId: "bleue", status: "present" },
  { id: "e11", name: "Lucas Fournier", teamId: "verte", status: "present" },
  { id: "e12", name: "Léa Morel", teamId: "verte", status: "present" },
  { id: "e13", name: "Nathan Girard", teamId: "verte", status: "present" },
  { id: "e14", name: "Chloé Blanc", teamId: "verte", status: "present" },
  { id: "e15", name: "Enzo Simon", teamId: "verte", status: "present" },
  { id: "e16", name: "Mathis Michel", teamId: "jaune", status: "present" },
  { id: "e17", name: "Emma Laurent", teamId: "jaune", status: "present" },
  { id: "e18", name: "Jules Garcia", teamId: "jaune", status: "present" },
  { id: "e19", name: "Manon David", teamId: "jaune", status: "present" },
  { id: "e20", name: "Hugo Richard", teamId: "jaune", status: "present" },
  { id: "e21", name: "Arthur Petit", teamId: "violette", status: "present" },
  { id: "e22", name: "Jade Martinez", teamId: "violette", status: "present" },
  { id: "e23", name: "Léo Robert", teamId: "violette", status: "present" },
  { id: "e24", name: "Louise Durand", teamId: "violette", status: "present" },
  { id: "e25", name: "Gabriel Leroy", teamId: "violette", status: "present" },
  { id: "e26", name: "Raphaël Moreau", teamId: "orange", status: "present" },
  { id: "e27", name: "Alice Simon", teamId: "orange", status: "present" },
  { id: "e28", name: "Maël Laurent", teamId: "orange", status: "present" },
  { id: "e29", name: "Juliette Michel", teamId: "orange", status: "present" },
  { id: "e30", name: "Louis Blanc", teamId: "orange", status: "present" },
];

const mockRoutes = [
  {
    id: "R1",
    title: "Tournée Densité & Hypercentre",
    lines: ["m2", "Ligne 1", "Ligne 2"],
    type: "Data-driven",
    duration: "7h 30m",
    coverageImpact: "+0.15%",
    travelersEst: "1'200",
    constraints: { ltr: true, cct: true, pause: "11:30 (Flon)" },
  },
  {
    id: "R2",
    title: "Tournée Aléatoire Périphérie",
    lines: ["Ligne 17", "Ligne 18", "LEB"],
    type: "Aléatoire",
    duration: "7h 15m",
    coverageImpact: "+0.22%",
    travelersEst: "450",
    constraints: { ltr: true, cct: true, pause: "12:15 (Cheseaux)" },
  },
  {
    id: "R3",
    title: "Tournée Mixte Pôles",
    lines: ["m1", "Ligne 4", "Ligne 6"],
    type: "Équilibrage",
    duration: "7h 45m",
    coverageImpact: "+0.18%",
    travelersEst: "850",
    constraints: { ltr: true, cct: true, pause: "13:00 (Renens Gare)" },
  },
];

// VARIABLE DE COULEUR ROUGE SOMBRE (tl-red-dark)
const PRIMARY_RED = "#990011";
const ACCENT_RED = "#7a000d";

export default function App() {
  const [activeTab, setActiveTab] = useState("planification");
  const [employees, setEmployees] = useState(initialEmployees);
  const [isGenerating, setIsGenerating] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [rightPanelTab, setRightPanelTab] = useState("map");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Système",
      text: "Début du service. Aucun incident sur le réseau.",
      time: "06:00",
      isDispatch: true,
    },
  ]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapTransform, setMapTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ isDragging: false, lastX: 0, lastY: 0 });
  const [isValidating, setIsValidating] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // --- ACTIONS ---
  const handleDragStart = (e, employeeId) => {
    e.dataTransfer.setData("employeeId", employeeId);
    e.target.style.opacity = "0.4";
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, targetTeamId) => {
    e.preventDefault();
    const employeeId = e.dataTransfer.getData("employeeId");
    if (!employeeId) return;
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              teamId: targetTeamId,
              status: targetTeamId === "absents" ? "absent" : "present",
            }
          : emp
      )
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setRoutes([]);
    setAssignments({});
    setTimeout(() => {
      setRoutes(mockRoutes);
      setIsGenerating(false);
    }, 1500);
  };
  const handleAssign = (routeId, teamId) => {
    setAssignments((prev) => ({ ...prev, [routeId]: teamId }));
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "Dispatch (Vous)",
        text: chatMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isDispatch: true,
      },
    ]);
    setChatMessage("");
  };

  const handleValidateDeploy = () => {
    if (Object.keys(assignments).length === 0) return;
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationSuccess(true);
      setTimeout(() => setValidationSuccess(false), 3000);
    }, 1500);
  };

  // --- MAP HANDLERS ---
  const handleWheel = (e) => {
    const scaleAdjustment = e.deltaY * -0.002;
    const newScale = Math.min(
      Math.max(0.4, mapTransform.scale + scaleAdjustment),
      5
    );
    setMapTransform((prev) => ({ ...prev, scale: newScale }));
  };
  const handlePointerDown = (e) => {
    if (e.target.closest("button")) return;
    e.preventDefault();
    dragRef.current.isDragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const deltaX = e.clientX - dragRef.current.lastX;
    const deltaY = e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    setMapTransform((prev) => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };
  const handlePointerUp = (e) => {
    dragRef.current.isDragging = false;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const resetMap = () => setMapTransform({ scale: 1, x: 0, y: 0 });
  const zoomIn = () =>
    setMapTransform((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + 0.5, 5),
    }));
  const zoomOut = () =>
    setMapTransform((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - 0.5, 0.4),
    }));
  const inverseScale = 1 / mapTransform.scale;

  // --- CALCULS ---
  const totalContacts = routes.reduce(
    (sum, route) =>
      assignments[route.id]
        ? sum + parseInt(route.travelersEst.replace(/'/g, ""), 10)
        : sum,
    0
  );
  const formattedContacts =
    totalContacts > 0
      ? `~ ${totalContacts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`
      : "0";
  const teamStats = initialTeams.map((team) => {
    const members = employees.filter((e) => e.teamId === team.id);
    const activeCount = members.filter((e) => e.status === "present").length;
    return { ...team, members, activeCount };
  });
  const absentEmployees = employees.filter((e) => e.teamId === "absents");
  const hasIncompleteTeams = teamStats.some(
    (t) => t.activeCount > 0 && t.activeCount < 3
  );

  return (
    <div className="min-h-screen bg-slate-200 flex font-sans text-slate-800">
      {/* SIDEBAR ROUGE SOMBRE */}
      {!(isFullscreen && activeTab === "planification") && (
        <aside
          className="w-64 flex-shrink-0 flex flex-col shadow-xl z-20 relative transition-all"
          style={{ backgroundColor: PRIMARY_RED }}
        >
          <div className="p-6 flex items-center gap-4 border-b border-black/10">
            {/* Logo tl bleu préservé */}
            <div className="w-12 h-12 bg-[#0066cc] rounded-lg flex items-center justify-center shadow-inner">
              <span className="font-bold text-3xl text-white tracking-tighter">
                tl
              </span>
            </div>
            <div className="text-white">
              <h1 className="font-bold tracking-wider text-sm">
                CRUNCH<span className="opacity-70">3CT</span>
              </h1>
              <p className="text-[10px] opacity-60 uppercase tracking-widest mt-1">
                Dispatch
              </p>
            </div>
          </div>

          <nav className="flex-1 py-6 px-4 space-y-2">
            <NavItem
              icon={<Map />}
              label="Planification (IA)"
              active={activeTab === "planification"}
              onClick={() => setActiveTab("planification")}
            />
            <NavItem
              icon={<Users />}
              label="Équipes"
              active={activeTab === "equipes"}
              onClick={() => setActiveTab("equipes")}
              badge={hasIncompleteTeams ? "!" : null}
            />
            <NavItem icon={<BarChart3 />} label="Statistiques Réseau" />
            <NavItem icon={<Radio />} label="Communications" />
          </nav>

          <div
            className="p-4 m-4 rounded-lg border border-white/10"
            style={{ backgroundColor: ACCENT_RED }}
          >
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
              <ShieldCheck size={16} className="text-emerald-300" />
              Statut Système
            </div>
            <p className="text-xs text-white/70 mb-1">
              SIRH:{" "}
              <span className="text-emerald-300 font-medium">Synchronisé</span>
            </p>
            <p className="text-xs text-white/70">
              GPS:{" "}
              <span className="text-emerald-300 font-medium">
                Actualisé il y a 5 min
              </span>
            </p>
          </div>
        </aside>
      )}

      {activeTab === "equipes" ? (
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-200">
          <header className="bg-white px-8 py-5 shadow-sm z-10 border-b border-slate-300 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Gestion des équipes 3CT
              </h2>
              <p className="text-sm text-slate-500">
                Ajustez la composition des équipes par glisser-déposer.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <UserPlus size={16} /> Ajouter / Enlever un collaborateur
            </button>
          </header>

          <div className="p-4 md:p-6 overflow-auto h-full custom-scrollbar flex flex-col gap-6">
            <div
              className="bg-slate-300/50 rounded-2xl border-2 border-dashed border-slate-400 p-5 shadow-inner"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "absents")}
            >
              <div className="flex justify-between items-center mb-4 text-slate-600">
                <h3 className="font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <UserX size={18} /> Absents / Réserve
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-400 text-white">
                  {absentEmployees.length} agents
                </span>
              </div>
              <div className="flex flex-wrap gap-3 min-h-[60px]">
                {absentEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, emp.id)}
                    onDragEnd={handleDragEnd}
                    className="flex items-center gap-2 p-2 px-3 rounded-lg bg-white border border-red-200 cursor-grab opacity-80 shadow-sm"
                  >
                    <GripVertical size={14} className="text-slate-400" />
                    <span className="font-medium text-sm text-red-800 line-through">
                      {emp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              {teamStats.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, team.id)}
                >
                  <div
                    className={`p-4 border-b flex justify-between items-center ${team.color.replace(
                      "text-",
                      "bg-opacity-20 bg-"
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${team.dot}`}></div>
                      <h3 className="font-bold text-slate-800">{team.name}</h3>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/70">
                      {team.activeCount} actifs
                    </span>
                  </div>
                  <div className="p-3 flex-1 min-h-[150px] flex flex-col gap-2">
                    {team.members.map((emp) => (
                      <div
                        key={emp.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, emp.id)}
                        onDragEnd={handleDragEnd}
                        className={`group flex items-center justify-between p-3 rounded-xl border cursor-grab transition-all ${
                          emp.status === "absent"
                            ? "bg-red-50 border-red-100 opacity-90"
                            : "bg-white border-slate-100 hover:border-blue-300 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical
                            size={16}
                            className={`${
                              emp.status === "absent"
                                ? "text-red-300"
                                : "text-slate-300"
                            }`}
                          />
                          <div
                            className={
                              emp.status === "absent"
                                ? "text-red-700"
                                : "text-slate-800"
                            }
                          >
                            <p
                              className={`font-semibold text-sm ${
                                emp.status === "absent" ? "line-through" : ""
                              }`}
                            >
                              {emp.name}
                            </p>
                            <p className="text-[10px] opacity-60 uppercase">
                              {emp.id}
                            </p>
                          </div>
                        </div>
                        {emp.status === "absent" ? (
                          <UserX size={14} className="text-red-500" />
                        ) : (
                          <UserCheck size={16} className="text-emerald-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-200">
          {!isFullscreen && (
            <header className="bg-white px-8 py-5 flex justify-between items-center shadow-sm z-10 border-b border-slate-300">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Génération des tournées
                </h2>
                <p className="text-sm text-slate-500">
                  Mardi 10 Mars 2026 • Journée standard
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Couverture Réseau
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      0.72%
                    </span>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full">
                      +0.02%
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-md"
                  style={{ backgroundColor: PRIMARY_RED }}
                >
                  {isGenerating ? (
                    <RefreshCcw className="animate-spin" size={20} />
                  ) : (
                    <Zap size={20} />
                  )}
                  {isGenerating
                    ? "Calcul IA..."
                    : "Générer les tournées optimales"}
                </button>
              </div>
            </header>
          )}

          {!isFullscreen && hasIncompleteTeams && (
            <div className="bg-slate-100 px-8 py-3 border-b border-slate-300 flex items-center gap-3 text-sm text-slate-700 font-medium z-10 shadow-sm">
              <AlertTriangle size={18} className="text-slate-500" />
              Info : Les équipes de moins de 3 agents sont grisées dans les
              affectations.
            </div>
          )}

          <div
            className={`flex-1 flex overflow-hidden ${
              isFullscreen ? "p-0" : "p-4 gap-6"
            }`}
          >
            {!isFullscreen && (
              <div className="w-[500px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                {/* Ajout de flex-shrink-0 à toutes les cartes pour éviter l'écrasement */}
                <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex-shrink-0">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Settings size={16} /> Modèle d'optimisation
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <ParamCard
                      label="Affluence"
                      value="40%"
                      desc="Focus pics"
                      color="text-red-700"
                    />
                    <ParamCard
                      label="Aléatoire"
                      value="35%"
                      desc="Anti-prévisibilité"
                      color="text-purple-700"
                    />
                    <ParamCard
                      label="Couverture"
                      value="25%"
                      desc="Maillage"
                      color="text-emerald-700"
                    />
                  </div>
                </div>

                {isGenerating && (
                  <div className="space-y-4 flex-shrink-0">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="animate-pulse bg-slate-200 h-32 rounded-2xl w-full flex-shrink-0"
                      ></div>
                    ))}
                  </div>
                )}

                {routes.map((route) => (
                  <div
                    key={route.id}
                    className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 hover:border-red-800 transition-colors relative overflow-hidden flex-shrink-0"
                  >
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <h4 className="font-bold text-lg">{route.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600 font-medium mt-1">
                          <span className="flex items-center gap-1 text-red-800">
                            <MapPin size={14} /> {route.lines.join(" • ")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {route.duration}
                          </span>
                        </div>
                      </div>
                      <select
                        className="bg-slate-50 border border-slate-300 text-slate-800 font-medium text-sm rounded-lg p-2 max-w-[180px]"
                        value={assignments[route.id] || ""}
                        onChange={(e) => handleAssign(route.id, e.target.value)}
                      >
                        <option value="" disabled>
                          Équipe...
                        </option>
                        {teamStats.map((team) => (
                          <option
                            key={team.id}
                            value={team.id}
                            disabled={
                              Object.values(assignments).includes(
                                team.id.toString()
                              ) || team.activeCount < 3
                            }
                          >
                            {team.name} ({team.activeCount})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 relative z-10">
                      <div>
                        <span className="block text-xs text-slate-500 mb-1 uppercase tracking-wider">
                          Couverture
                        </span>
                        <span className="font-bold text-emerald-700">
                          {route.coverageImpact}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-slate-500 mb-1 uppercase tracking-wider">
                          Contacts est.
                        </span>
                        <span className="font-bold text-slate-800">
                          {route.travelersEst}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 justify-center">
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 size={14} /> LTR Validée
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                          Pause: {route.constraints.pause}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 flex flex-col gap-6 h-full overflow-hidden relative">
              <div
                className={`bg-white shadow-md flex flex-col flex-1 overflow-hidden min-h-0 ${
                  isFullscreen
                    ? "rounded-none border-none"
                    : "rounded-2xl border border-slate-200"
                }`}
              >
                {!isFullscreen && (
                  <div className="flex border-b border-slate-200 bg-slate-100 flex-shrink-0">
                    <button
                      onClick={() => setRightPanelTab("map")}
                      className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                        rightPanelTab === "map"
                          ? "text-red-900 border-b-2 border-red-900 bg-white"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <Map size={16} /> Carte & Couverture
                    </button>
                    <button
                      onClick={() => setRightPanelTab("chat")}
                      className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                        rightPanelTab === "chat"
                          ? "text-red-900 border-b-2 border-red-900 bg-white"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <MessageSquare size={16} /> Alertes Dispatch
                    </button>
                  </div>
                )}

                {rightPanelTab === "map" || isFullscreen ? (
                  <div
                    className="flex-1 relative bg-[#1e293b] overflow-hidden group touch-none select-none"
                    onWheel={handleWheel}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  >
                    <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="bg-white/90 p-2 rounded-lg shadow-md hover:bg-white transition-colors"
                      >
                        {isFullscreen ? (
                          <Minimize2 size={20} />
                        ) : (
                          <Maximize2 size={20} />
                        )}
                      </button>
                      <div className="bg-white/90 rounded-lg shadow-md flex flex-col mt-2">
                        <button
                          onClick={zoomIn}
                          className="p-2 border-b border-slate-200 hover:bg-slate-100"
                        >
                          <ZoomIn size={20} />
                        </button>
                        <button
                          onClick={zoomOut}
                          className="p-2 border-b border-slate-200 hover:bg-slate-100"
                        >
                          <ZoomOut size={20} />
                        </button>
                        <button
                          onClick={resetMap}
                          className="p-2 hover:bg-slate-100"
                        >
                          <Focus size={20} />
                        </button>
                      </div>
                    </div>
                    <div
                      className="w-full h-full relative transform-gpu origin-center pointer-events-none"
                      style={{
                        transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
                        transition: isDragging
                          ? "none"
                          : "transform 0.1s ease-out",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-80"
                        style={{
                          backgroundImage: 'url("/plan_reseau.jpg")',
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />

                      {/* ZONE ROUGE */}
                      <div
                        className="absolute top-[35%] left-[35%] w-32 h-32 bg-red-600 rounded-full mix-blend-screen filter blur-2xl opacity-70 animate-pulse"
                        style={{ transform: `translate(-50%, -50%)` }}
                      ></div>
                      <div
                        className="absolute top-[35%] left-[35%] bg-white border border-red-200 px-3 py-2 rounded shadow-md origin-center"
                        style={{
                          transform: `translate(-50%, -50%) scale(${inverseScale})`,
                        }}
                      >
                        <p className="text-xs font-bold text-red-900 uppercase">
                          Renens - Crissier
                        </p>
                        <p className="text-xs text-slate-600">
                          Couverture: Faible
                        </p>
                      </div>

                      {/* ZONE VERTE */}
                      <div
                        className="absolute top-[50%] left-[50%] w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-3xl opacity-60"
                        style={{ transform: `translate(-50%, -50%)` }}
                      ></div>
                      <div
                        className="absolute top-[50%] left-[50%] bg-white border border-emerald-200 px-3 py-2 rounded shadow-md text-center origin-center"
                        style={{
                          transform: `translate(-50%, -50%) scale(${inverseScale})`,
                        }}
                      >
                        <p className="text-xs font-bold text-emerald-900 uppercase">
                          Flon / Hypercentre
                        </p>
                        <p className="text-xs text-slate-600">
                          Couverture: Optimale
                        </p>
                      </div>

                      {/* ZONE JAUNE (Réintégrée) */}
                      <div
                        className="absolute top-[65%] left-[70%] w-32 h-32 bg-amber-500 rounded-full mix-blend-screen filter blur-xl opacity-60"
                        style={{ transform: `translate(-50%, -50%)` }}
                      ></div>
                      <div
                        className="absolute top-[65%] left-[70%] bg-white border border-amber-200 px-3 py-2 rounded shadow-md origin-center"
                        style={{
                          transform: `translate(-50%, -50%) scale(${inverseScale})`,
                        }}
                      >
                        <p className="text-xs font-bold text-amber-900 uppercase">
                          Pully / Lutry
                        </p>
                        <p className="text-xs text-slate-600">
                          Couverture: Moyenne
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col bg-slate-100 min-h-0">
                    <div
                      className="p-3 border-b border-red-100 flex items-center gap-2 flex-shrink-0"
                      style={{ backgroundColor: "rgba(153, 0, 17, 0.05)" }}
                    >
                      <Radio
                        size={16}
                        className="animate-pulse"
                        style={{ color: PRIMARY_RED }}
                      />
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: PRIMARY_RED }}
                      >
                        Canal Opérationnel Sécurisé
                      </span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 custom-scrollbar">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.isDispatch ? "items-end" : "items-start"
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 mb-1 font-medium">
                            {msg.sender} • {msg.time}
                          </span>
                          <div
                            className={`p-3 rounded-xl max-w-[85%] text-sm shadow-sm ${
                              msg.isDispatch
                                ? "text-white"
                                : "bg-white border border-slate-200 text-slate-800"
                            }`}
                            style={{
                              backgroundColor: msg.isDispatch
                                ? PRIMARY_RED
                                : undefined,
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      onSubmit={handleSendMessage}
                      className="p-3 bg-white border-t border-slate-200 flex gap-2 flex-shrink-0"
                    >
                      <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg p-2 max-w-[120px]">
                        <option>Toutes</option>
                        {teamStats.map((t) => (
                          <option key={t.id}>{t.name}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Alerte..."
                        className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:ring-1"
                        style={{ focusRingColor: PRIMARY_RED }}
                      />
                      <button
                        type="submit"
                        className="text-white p-2 px-4 rounded-lg transition-colors"
                        style={{ backgroundColor: PRIMARY_RED }}
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {!isFullscreen && (
                <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 flex-shrink-0">
                  <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                    Déploiement en cours
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1">
                        <Users size={12} style={{ color: PRIMARY_RED }} />{" "}
                        Affectations
                      </span>
                      <span className="font-bold text-lg">
                        {Object.keys(assignments).length} / 6 équipes
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-600" />{" "}
                        Contacts
                      </span>
                      <span className="font-bold text-lg text-emerald-800">
                        {formattedContacts}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1">
                        <AlertTriangle size={12} className="text-red-600" />{" "}
                        Zones Critiques
                      </span>
                      <span className="font-bold text-lg text-red-900">1</span>
                    </div>
                  </div>
                  <button
                    onClick={handleValidateDeploy}
                    disabled={
                      Object.keys(assignments).length === 0 ||
                      isValidating ||
                      validationSuccess
                    }
                    className={`w-full mt-4 py-3 rounded-xl font-bold transition-all shadow-md flex justify-center items-center gap-2 text-white
                      ${
                        isValidating
                          ? "bg-slate-400 cursor-wait"
                          : validationSuccess
                          ? "bg-emerald-600"
                          : "bg-slate-900 hover:bg-slate-800"
                      }
                    `}
                  >
                    {isValidating && (
                      <RefreshCcw className="animate-spin" size={18} />
                    )}
                    {validationSuccess && (
                      <CheckCircle2 size={18} className="animate-bounce" />
                    )}
                    {isValidating
                      ? "Notification..."
                      : validationSuccess
                      ? "Agents notifiés !"
                      : "Valider & Notifier les Smartphones"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}

function NavItem({ icon, label, active = false, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
        active ? "bg-white shadow-md" : "text-white/80 hover:bg-white/10"
      }`}
      style={{ color: active ? "#990011" : undefined }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold text-sm">{label}</span>
      </div>
      {badge && (
        <span className="bg-white text-red-900 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
          {badge}
        </span>
      )}
    </button>
  );
}

function ParamCard({ label, value, desc, color }) {
  return (
    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex-shrink-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase">
          {label}
        </span>
        <span className={`text-sm font-bold ${color}`}>{value}</span>
      </div>
      <p className="text-[9px] text-slate-400 leading-tight">{desc}</p>
    </div>
  );
}
