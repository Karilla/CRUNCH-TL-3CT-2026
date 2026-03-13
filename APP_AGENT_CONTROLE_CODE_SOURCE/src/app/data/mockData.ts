// Mock data for Lausanne public transport network

export interface TransitLine {
  id: string;
  name: string;
  type: 'metro' | 'bus' | 'trolleybus';
  color: string;
  coordinates: [number, number][];
}

export interface Station {
  id: string;
  name: string;
  coordinates: [number, number];
  isPrimaryHub: boolean;
}

export interface TeamInfo {
  id: string;
  name: string;
  color: string;
  zones: string[];
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  teamId: string;
  position: [number, number];
  status: 'active' | 'break' | 'transit';
  currentLocation: string;
  currentZone: string;
  lastControl: string;
  birthday?: string; // Format: "DD/MM" (e.g., "15/03")
  hireDate?: string; // Format: "YYYY-MM-DD" (e.g., "2018-05-15")
  isManager?: boolean; // Flag to identify operational managers
  plannedRoute?: {
    time: string;
    location: string;
    position: [number, number];
  }[];
  weekPlanning?: {
    date: string;
    day: string;
    shifts: {
      startTime: string;
      endTime: string;
      zone: string;
    }[];
  }[];
}

export interface ControlZone {
  id: string;
  name: string;
  coordinates: [number, number][];
  teamId: string;
  lastControlled: string;
  coverageRate: number;
}

export interface Alert {
  id: string;
  type: 'operational' | 'incident' | 'message';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  location?: string;
  time: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  time: string;
  type: 'message' | 'alert';
}

// Lausanne center coordinates
export const LAUSANNE_CENTER: [number, number] = [46.5197, 6.6323];

// Current user (logged in agent)
export const CURRENT_USER_ID = 'a1'; // Jean Dupont - Équipe Rouge

// Teams structure (6 teams of 5 people each)
export const teams: TeamInfo[] = [
  {
    id: 'team-red',
    name: 'Équipe Rouge',
    color: '#E30613',
    zones: ['Centre-Flon', 'St-François'],
  },
  {
    id: 'team-blue',
    name: 'Équipe Bleue',
    color: '#3B82F6',
    zones: ['Gare-Ouchy', 'Montbenon'],
  },
  {
    id: 'team-green',
    name: 'Équipe Verte',
    color: '#22C55E',
    zones: ['Renens-Ouest', 'Prilly'],
  },
  {
    id: 'team-yellow',
    name: 'Équipe Jaune',
    color: '#EAB308',
    zones: ['Croisettes-Nord', 'Bellevaux'],
  },
  {
    id: 'team-purple',
    name: 'Équipe Violette',
    color: '#A855F7',
    zones: ['Malley-Préverenges', 'Chailly'],
  },
  {
    id: 'team-orange',
    name: 'Équipe Orange',
    color: '#F97316',
    zones: ['Sauvabelin', 'Vennes'],
  },
];

// Week planning template for agents
const weekPlanningTemplate = [
  { date: '11/03/2026', day: 'Mercredi' },
  { date: '12/03/2026', day: 'Jeudi' },
  { date: '13/03/2026', day: 'Vendredi' },
  { date: '14/03/2026', day: 'Samedi' },
  { date: '15/03/2026', day: 'Dimanche' },
  { date: '16/03/2026', day: 'Lundi' },
  { date: '17/03/2026', day: 'Mardi' },
];

// All agents (distribution variable: 5+4+3+2+3+0 = 17 agents)
export const agents: Agent[] = [
  // ÉQUIPE ROUGE (5 agents)
  {
    id: 'a1',
    name: 'Jean Dupont',
    photo: 'https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWN1cml0eSUyMG9mZmljZXIlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjI1ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-red',
    position: [46.5197, 6.6323],
    status: 'active',
    currentLocation: 'Lausanne-Flon',
    currentZone: 'Centre-Flon',
    lastControl: '10:45',
    birthday: '24/08',
    hireDate: '2015-03-10',
    plannedRoute: [
      { time: '11:15', location: 'St-François', position: [46.5194, 6.6315] },
      { time: '12:00', location: 'Riponne', position: [46.5227, 6.6318] },
      { time: '12:45', location: 'Bel-Air', position: [46.5210, 6.6340] },
    ],
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '12:00', zone: 'Centre-Flon' },
        { startTime: '13:00', endTime: '17:00', zone: 'St-François' },
      ],
    })),
  },
  {
    id: 'a2',
    name: 'Sophie Martin',
    photo: 'https://images.unsplash.com/photo-1575997759025-5cb986a6041d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB0cmFuc3BvcnQlMjB3b3JrZXIlMjB1bmlmb3JtJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjI1ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-red',
    position: [46.5194, 6.6315],
    status: 'active',
    currentLocation: 'St-François',
    currentZone: 'Centre-Flon',
    lastControl: '10:30',
    birthday: '12/03',
    hireDate: '2018-09-01',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Samedi' || day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '16:00', zone: 'St-François' },
      ],
    })),
  },
  {
    id: 'a3',
    name: 'Marc Lefèvre',
    photo: 'https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG1hbGUlMjBidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc3MzIyNTgxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-red',
    position: [46.5210, 6.6340],
    status: 'transit',
    currentLocation: 'Bel-Air',
    currentZone: 'Centre-Flon',
    lastControl: '10:20',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '09:00', endTime: '17:00', zone: 'Centre-Flon' },
      ],
    })),
  },
  {
    id: 'a4',
    name: 'Claire Bernard',
    photo: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMTM5NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-red',
    position: [46.5227, 6.6318],
    status: 'break',
    currentLocation: 'Riponne',
    currentZone: 'Centre-Flon',
    lastControl: '09:50',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Samedi' || day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '12:00', zone: 'Centre-Flon' },
        { startTime: '13:00', endTime: '17:00', zone: 'St-François' },
      ],
    })),
  },
  {
    id: 'a5',
    name: 'Luc Moreau',
    photo: 'https://images.unsplash.com/photo-1584940121730-93ffb8aa88b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBwcm9mZXNzaW9uYWwlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMTg0Mjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-red',
    position: [46.5200, 6.6330],
    status: 'active',
    currentLocation: 'Lausanne Centre',
    currentZone: 'Centre-Flon',
    lastControl: '10:55',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '07:00', endTime: '15:00', zone: 'St-François' },
      ],
    })),
  },

  // ÉQUIPE BLEUE (4 agents)
  {
    id: 'a6',
    name: 'Marie Dubois',
    photo: 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjI1ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-blue',
    position: [46.5167, 6.6293],
    status: 'active',
    currentLocation: 'Lausanne-Gare',
    currentZone: 'Gare-Ouchy',
    lastControl: '10:40',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '16:00', zone: 'Gare-Ouchy' },
      ],
    })),
  },
  {
    id: 'a7',
    name: 'Thomas Petit',
    photo: 'https://images.unsplash.com/photo-1632054229795-4097870879b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjBwcm9mZXNzaW9uYWwlMjBtYWxlfGVufDF8fHx8MTc3MzIyNTgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-blue',
    position: [46.5100, 6.6270],
    status: 'active',
    currentLocation: 'M2 - Vers Ouchy',
    currentZone: 'Gare-Ouchy',
    lastControl: '10:25',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Samedi' || day.day === 'Dimanche' ? [] : [
        { startTime: '09:00', endTime: '17:00', zone: 'Gare-Ouchy' },
      ],
    })),
  },
  {
    id: 'a8',
    name: 'Laura Garcia',
    photo: 'https://images.unsplash.com/photo-1592206934769-67dc0e88b5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMTUxMTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-blue',
    position: [46.5040, 6.6280],
    status: 'active',
    currentLocation: 'Ouchy',
    currentZone: 'Gare-Ouchy',
    lastControl: '10:50',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '12:00', zone: 'Gare-Ouchy' },
        { startTime: '13:00', endTime: '17:00', zone: 'Montbenon' },
      ],
    })),
  },
  {
    id: 'a9',
    name: 'Ahmed Hassan',
    photo: 'https://images.unsplash.com/photo-1771766691105-455a273c6ca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwcHJvZmVzc2lvbmFsJTIwbWFsZXxlbnwxfHx8fDE3NzMyMjU4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-blue',
    position: [46.5185, 6.6350],
    status: 'transit',
    currentLocation: 'Montbenon',
    currentZone: 'Montbenon',
    lastControl: '10:15',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Samedi' || day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '16:00', zone: 'Montbenon' },
      ],
    })),
  },

  // ÉQUIPE VERTE (3 agents)
  {
    id: 'a11',
    name: 'Pierre Lambert',
    photo: 'https://images.unsplash.com/photo-1769071166530-11f7857f4c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiZWFyZGVkJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjIyNjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-green',
    position: [46.5370, 6.5875],
    status: 'active',
    currentLocation: 'Renens-Gare',
    currentZone: 'Renens-Ouest',
    lastControl: '10:50',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '16:00', zone: 'Renens-Ouest' },
      ],
    })),
  },
  {
    id: 'a12',
    name: 'Nathalie Girard',
    photo: 'https://images.unsplash.com/photo-1758599543111-36ce5c34fceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGdsYXNzZXMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMyMjI2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-green',
    position: [46.5340, 6.5920],
    status: 'active',
    currentLocation: 'M1 - Renens',
    currentZone: 'Renens-Ouest',
    lastControl: '10:35',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Samedi' || day.day === 'Dimanche' ? [] : [
        { startTime: '09:00', endTime: '17:00', zone: 'Renens-Ouest' },
      ],
    })),
  },
  {
    id: 'a13',
    name: 'David Chen',
    photo: 'https://images.unsplash.com/photo-1770392988936-dc3d8581e0c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMG1hbGUlMjBhc2lhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzIyNTgyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-green',
    position: [46.5310, 6.6010],
    status: 'transit',
    currentLocation: 'M1 - Prilly',
    currentZone: 'Prilly',
    lastControl: '10:20',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '12:00', zone: 'Prilly' },
        { startTime: '13:00', endTime: '17:00', zone: 'Renens-Ouest' },
      ],
    })),
  },

  // ÉQUIPE JAUNE (2 agents)
  {
    id: 'a16',
    name: 'Camille Blanc',
    photo: 'https://images.unsplash.com/photo-1551438632-cacd75df629f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRhcmslMjBoYWlyfGVufDF8fHx8MTc3MzIyNTgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-yellow',
    position: [46.5420, 6.6560],
    status: 'active',
    currentLocation: 'Croisettes',
    currentZone: 'Croisettes-Nord',
    lastControl: '10:30',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '16:00', zone: 'Croisettes-Nord' },
      ],
    })),
  },
  {
    id: 'a18',
    name: 'Sylvie Dupuis',
    photo: 'https://images.unsplash.com/flagged/photo-1573582677725-863b570e3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJydW5ldHRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjI1ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-yellow',
    position: [46.5290, 6.6550],
    status: 'transit',
    currentLocation: 'Bellevaux',
    currentZone: 'Bellevaux',
    lastControl: '10:10',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '12:00', zone: 'Bellevaux' },
        { startTime: '13:00', endTime: '17:00', zone: 'Croisettes-Nord' },
      ],
    })),
  },

  // ÉQUIPE VIOLETTE (3 agents)
  {
    id: 'a21',
    name: 'Antoine Dupont',
    photo: 'https://images.unsplash.com/photo-1750741268857-7e44510f867d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMyMjU4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-purple',
    position: [46.5050, 6.6450],
    status: 'active',
    currentLocation: 'Malley',
    currentZone: 'Malley-Préverenges',
    lastControl: '10:35',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '16:00', zone: 'Malley-Préverenges' },
      ],
    })),
  },
  {
    id: 'a23',
    name: 'Maxime Fontaine',
    photo: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIweY9uclMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzMyMjU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-purple',
    position: [46.5150, 6.6420],
    status: 'transit',
    currentLocation: 'Bus 1 - Chailly',
    currentZone: 'Chailly',
    lastControl: '10:20',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '08:00', endTime: '12:00', zone: 'Chailly' },
        { startTime: '13:00', endTime: '17:00', zone: 'Malley-Préverenges' },
      ],
    })),
  },
  {
    id: 'a25',
    name: 'Sébastien Leclerc',
    photo: 'https://images.unsplash.com/photo-1695266391814-a276948f1775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwc3Rlcm4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMyMjU4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    teamId: 'team-purple',
    position: [46.5200, 6.6400],
    status: 'break',
    currentLocation: 'En pause - Bus 1',
    currentZone: 'Chailly',
    lastControl: '09:40',
    weekPlanning: weekPlanningTemplate.map((day) => ({
      ...day,
      shifts: day.day === 'Dimanche' ? [] : [
        { startTime: '07:00', endTime: '15:00', zone: 'Malley-Préverenges' },
      ],
    })),
  },

  // ÉQUIPE ORANGE (0 agents)
];

// Operational Managers - Not part of teams, but can communicate with all teams
export const managers: Agent[] = [
  {
    id: 'm1',
    name: 'Philippe Renaud',
    photo: 'https://images.unsplash.com/photo-1695266391814-a276948f1775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBtYW5hZ2VyJTIwbWFsZSUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzM4OTg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    teamId: 'management', // Special team ID for managers
    position: [46.5197, 6.6323],
    status: 'active',
    currentLocation: 'Centre de Coordination',
    currentZone: 'Bureau Central',
    lastControl: '—',
    isManager: true,
    hireDate: '2010-01-15',
  },
  {
    id: 'm2',
    name: 'Catherine Dubois',
    photo: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VyJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzM4OTg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    teamId: 'management',
    position: [46.5197, 6.6323],
    status: 'active',
    currentLocation: 'Centre de Coordination',
    currentZone: 'Bureau Central',
    lastControl: '—',
    isManager: true,
    hireDate: '2012-06-20',
  },
];

// Control zones assigned to teams
export const controlZones: ControlZone[] = [
  // ÉQUIPE ROUGE
  {
    id: 'z1',
    name: 'Centre-Flon',
    coordinates: [
      [46.5240, 6.6280],
      [46.5240, 6.6370],
      [46.5170, 6.6370],
      [46.5170, 6.6280],
    ],
    teamId: 'team-red',
    lastControlled: '10:45',
    coverageRate: 95,
  },
  {
    id: 'z2',
    name: 'St-François',
    coordinates: [
      [46.5170, 6.6280],
      [46.5170, 6.6370],
      [46.5120, 6.6370],
      [46.5120, 6.6280],
    ],
    teamId: 'team-red',
    lastControlled: '10:30',
    coverageRate: 90,
  },

  // ÉQUIPE BLEUE
  {
    id: 'z3',
    name: 'Gare-Ouchy',
    coordinates: [
      [46.5170, 6.6250],
      [46.5170, 6.6330],
      [46.5020, 6.6330],
      [46.5020, 6.6250],
    ],
    teamId: 'team-blue',
    lastControlled: '10:50',
    coverageRate: 92,
  },
  {
    id: 'z4',
    name: 'Montbenon',
    coordinates: [
      [46.5170, 6.6330],
      [46.5170, 6.6410],
      [46.5120, 6.6410],
      [46.5120, 6.6330],
    ],
    teamId: 'team-blue',
    lastControlled: '10:15',
    coverageRate: 78,
  },

  // ÉQUIPE VERTE
  {
    id: 'z5',
    name: 'Renens-Ouest',
    coordinates: [
      [46.5410, 6.5820],
      [46.5410, 6.5930],
      [46.5320, 6.5930],
      [46.5320, 6.5820],
    ],
    teamId: 'team-green',
    lastControlled: '10:50',
    coverageRate: 88,
  },
  {
    id: 'z6',
    name: 'Prilly',
    coordinates: [
      [46.5320, 6.5930],
      [46.5320, 6.6100],
      [46.5240, 6.6100],
      [46.5240, 6.5930],
    ],
    teamId: 'team-green',
    lastControlled: '10:45',
    coverageRate: 85,
  },

  // ÉQUIPE JAUNE
  {
    id: 'z7',
    name: 'Croisettes-Nord',
    coordinates: [
      [46.5460, 6.6500],
      [46.5460, 6.6620],
      [46.5370, 6.6620],
      [46.5370, 6.6500],
    ],
    teamId: 'team-yellow',
    lastControlled: '10:30',
    coverageRate: 82,
  },
  {
    id: 'z8',
    name: 'Bellevaux',
    coordinates: [
      [46.5320, 6.6460],
      [46.5320, 6.6640],
      [46.5240, 6.6640],
      [46.5240, 6.6460],
    ],
    teamId: 'team-yellow',
    lastControlled: '10:55',
    coverageRate: 87,
  },

  // ÉQUIPE VIOLETTE
  {
    id: 'z9',
    name: 'Malley-Préverenges',
    coordinates: [
      [46.5120, 6.6370],
      [46.5120, 6.6550],
      [46.4920, 6.6550],
      [46.4920, 6.6370],
    ],
    teamId: 'team-purple',
    lastControlled: '10:45',
    coverageRate: 80,
  },
  {
    id: 'z10',
    name: 'Chailly',
    coordinates: [
      [46.5240, 6.6370],
      [46.5240, 6.6460],
      [46.5120, 6.6460],
      [46.5120, 6.6370],
    ],
    teamId: 'team-purple',
    lastControlled: '10:50',
    coverageRate: 83,
  },

  // ÉQUIPE ORANGE
  {
    id: 'z11',
    name: 'Sauvabelin',
    coordinates: [
      [46.5320, 6.6370],
      [46.5320, 6.6500],
      [46.5240, 6.6500],
      [46.5240, 6.6370],
    ],
    teamId: 'team-orange',
    lastControlled: '10:25',
    coverageRate: 75,
  },
  {
    id: 'z12',
    name: 'Vennes',
    coordinates: [
      [46.5370, 6.6460],
      [46.5370, 6.6650],
      [46.5320, 6.6650],
      [46.5320, 6.6460],
    ],
    teamId: 'team-orange',
    lastControlled: '10:50',
    coverageRate: 81,
  },
];

// Metro lines (M1, M2)
export const transitLines: TransitLine[] = [
  {
    id: 'm1',
    name: 'M1 - Renens - Lausanne-Flon',
    type: 'metro',
    color: '#E30613',
    coordinates: [
      [46.5370, 6.5875], // Renens
      [46.5340, 6.5920],
      [46.5310, 6.6010],
      [46.5280, 6.6100],
      [46.5250, 6.6180],
      [46.5220, 6.6250],
      [46.5197, 6.6323], // Lausanne-Flon
    ],
  },
  {
    id: 'm2',
    name: 'M2 - Croisettes - Ouchy',
    type: 'metro',
    color: '#E30613',
    coordinates: [
      [46.5420, 6.6560], // Croisettes
      [46.5380, 6.6490],
      [46.5340, 6.6420],
      [46.5300, 6.6370],
      [46.5260, 6.6340],
      [46.5220, 6.6320],
      [46.5197, 6.6323], // Lausanne-Flon
      [46.5170, 6.6310],
      [46.5140, 6.6290],
      [46.5100, 6.6270],
      [46.5070, 6.6250],
      [46.5040, 6.6280], // Ouchy
    ],
  },
  {
    id: 'bus1',
    name: 'Bus 1 - Maladière - Préverenges',
    type: 'bus',
    color: '#58585A',
    coordinates: [
      [46.5450, 6.6200],
      [46.5400, 6.6250],
      [46.5350, 6.6300],
      [46.5300, 6.6350],
      [46.5250, 6.6380],
      [46.5200, 6.6400],
      [46.5150, 6.6420],
      [46.5100, 6.6450],
      [46.4950, 6.6500],
    ],
  },
  {
    id: 'bus25',
    name: 'Bus 25 - Bel-Air - Bellevaux',
    type: 'bus',
    color: '#58585A',
    coordinates: [
      [46.5210, 6.6340],
      [46.5230, 6.6380],
      [46.5250, 6.6420],
      [46.5270, 6.6460],
      [46.5290, 6.6500],
      [46.5310, 6.6540],
      [46.5350, 6.6600],
    ],
  },
  {
    id: 'tbus2',
    name: 'Trolleybus 2 - Désert - Bourdonnette',
    type: 'trolleybus',
    color: '#58585A',
    coordinates: [
      [46.5480, 6.6150],
      [46.5440, 6.6200],
      [46.5400, 6.6250],
      [46.5360, 6.6300],
      [46.5320, 6.6350],
      [46.5280, 6.6400],
      [46.5240, 6.6450],
      [46.5200, 6.6500],
      [46.5160, 6.6550],
    ],
  },
];

// Major stations and hubs
export const stations: Station[] = [
  { id: 's1', name: 'Lausanne-Flon', coordinates: [46.5197, 6.6323], isPrimaryHub: true },
  { id: 's2', name: 'Lausanne-Gare', coordinates: [46.5167, 6.6293], isPrimaryHub: true },
  { id: 's3', name: 'Ouchy', coordinates: [46.5040, 6.6280], isPrimaryHub: true },
  { id: 's4', name: 'Renens-Gare', coordinates: [46.5370, 6.5875], isPrimaryHub: true },
  { id: 's5', name: 'Croisettes', coordinates: [46.5420, 6.6560], isPrimaryHub: false },
  { id: 's6', name: 'Bel-Air', coordinates: [46.5210, 6.6340], isPrimaryHub: false },
  { id: 's7', name: 'Riponne', coordinates: [46.5227, 6.6318], isPrimaryHub: false },
  { id: 's8', name: 'St-François', coordinates: [46.5194, 6.6315], isPrimaryHub: false },
  { id: 's9', name: 'Montbenon', coordinates: [46.5185, 6.6350], isPrimaryHub: false },
  { id: 's10', name: 'Préverenges', coordinates: [46.4950, 6.6500], isPrimaryHub: false },
];

// Operational stats
export const stats = {
  dailyTarget: 2333, // 70000 / 30 days
  weeklyTarget: 16100, // 70000 / 4.35 weeks
  monthlyTarget: 70000,
  currentDayControls: 1847,
  currentWeekControls: 11250,
  currentMonthControls: 42500,
  networkCoverageRate: 84,
  activeAgents: 23,
  totalAgents: 30,
};

// Alerts
export const alerts: Alert[] = [
  {
    id: 'a1',
    type: 'operational',
    priority: 'high',
    title: 'Forte affluence - M2 Ouchy',
    message: 'Affluence exceptionnelle détectée à la station Ouchy. Renforcement souhaité.',
    location: 'M2 - Ouchy',
    time: '10:35',
  },
  {
    id: 'a2',
    type: 'incident',
    priority: 'medium',
    title: 'Perturbation Bus 25',
    message: 'Retard de 15 minutes sur la ligne Bus 25 suite à un incident technique.',
    location: 'Bus 25 - Bellevaux',
    time: '10:20',
  },
  {
    id: 'a3',
    type: 'message',
    priority: 'high',
    title: 'Message du gestionnaire',
    message: 'Prioriser les zones Malley-Préverenges et Bellevaux cet après-midi. Merci.',
    time: '09:45',
  },
  {
    id: 'a3a',
    type: 'message',
    priority: 'high',
    title: 'Remarque du gestionnaire',
    message: 'N\'oubliez pas de compléter vos rapports quotidiens avant 17h00. Assurez-vous que toutes les interventions soient documentées.',
    time: '08:30',
  },
  {
    id: 'a3b',
    type: 'incident',
    priority: 'high',
    title: 'Incident sécurité - Gare CFF',
    message: 'Situation nécessitant une présence immédiate à la Gare CFF. Coordonner avec la sécurité.',
    location: 'Gare CFF - Hall principal',
    time: '10:40',
  },
  {
    id: 'a4',
    type: 'operational',
    priority: 'low',
    title: 'Travaux M1 ce week-end',
    message: 'Maintenance planifiée sur M1 samedi et dimanche. Service réduit prévu.',
    location: 'M1',
    time: '09:00',
  },
];

// Chat messages
export const chatMessages: ChatMessage[] = [
  {
    id: 'msg0',
    senderId: 'm1',
    senderName: 'Philippe Renaud',
    message: 'Bonjour à tous, n\'oubliez pas de prioriser les zones Malley-Préverenges et Bellevaux cet après-midi.',
    time: '09:45',
    type: 'message',
  },
  {
    id: 'msg1',
    senderId: 'a6',
    senderName: 'Marie Dubois',
    message: 'Équipe Bleue en route vers Ouchy, zone couverte à 92%',
    time: '10:50',
    type: 'message',
  },
  {
    id: 'msg2',
    senderId: 'system',
    senderName: 'Système',
    message: '⚠️ Forte affluence détectée à M2 Ouchy',
    time: '10:35',
    type: 'alert',
  },
  {
    id: 'msg3',
    senderId: 'a11',
    senderName: 'Pierre Lambert',
    message: 'Renens contrôlé, tout OK. Passage à Prilly dans 15 min',
    time: '10:30',
    type: 'message',
  },
  {
    id: 'msg4',
    senderId: 'a1',
    senderName: 'Jean Dupont',
    message: 'Besoin renfort sur Centre-Flon?',
    time: '10:25',
    type: 'message',
  },
  {
    id: 'msg5',
    senderId: 'm2',
    senderName: 'Catherine Dubois',
    message: 'Équipe Rouge, excellent travail ce matin. Continuez sur cette lancée !',
    time: '10:20',
    type: 'message',
  },
  {
    id: 'msg6',
    senderId: 'a16',
    senderName: 'Camille Blanc',
    message: 'Équipe Jaune opérationnelle Croisettes',
    time: '10:15',
    type: 'message',
  },
];