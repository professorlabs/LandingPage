import { Hero } from '@/lib/types';

// Heroes who sacrificed their lives for Bangladesh
export const heroes: Hero[] = [
    {
        id: '1',
        name: 'আবরার ফাহাদ',
        image: '/abrar-fahad.png',
        role: ''
    },
    {
        id: '2',
        name: 'আবু সাঈদ',
        image: '/abu-sayed.png',
        role: ''
    },
    {
        id: '3',
        name: 'সাইফুল ইসলাম আলিফ',
        image: '/adv-saiful.png',
        role: ''
    },
    {
        id: '4',
        name: 'উসমান হাদি',
        image: '/osman-hadi.png',
        role: ''
    },
    {
        id: '5',
        name: 'পরবর্তী কে?',
        image: '/whonext.png',
        role: ''
    }
];

export function getHeroes(): Hero[] {
    return heroes;
}
