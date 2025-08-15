// Habit object (this is a rough idea for what a habit is)

export interface Habit {
    id: string;
    name:string;
    description:string;
    category: 'health' | 'productivity' | 'fitness';
    frequency: 'daily' | 'weekly' | 'monthly';
    total: number;
    streak: number;
    highestStreak: number;
    color:string;
    icon?: string;
    createdAt: Date;
    isActive: boolean;
}