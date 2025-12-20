import { Hero } from '@/lib/types';
import Image from 'next/image';

interface HeroCardProps {
    hero: Hero;
}

export default function HeroCard({ hero }: HeroCardProps) {
    return (
        <div className="hero-card">
            <div className="hero-card-image">
                <Image
                    src={hero.image}
                    alt={hero.name}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="hero-card-info">
                <h4 className="hero-card-name">{hero.name}</h4>
                {hero.role && <span className="hero-card-role">{hero.role}</span>}
            </div>
        </div>
    );
}
