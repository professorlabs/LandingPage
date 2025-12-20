import { getHeroes } from '@/data/heroes';
import HeroCard from './HeroCard';

export default function Footer() {
    const heroes = getHeroes();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-heroes">
                    <h3 className="footer-heroes-title">যারা দেশের জন্য জীবন দিয়েছেন</h3>
                    <div className="footer-heroes-grid">
                        {heroes.map((hero) => (
                            <HeroCard key={hero.id} hero={hero} />
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        Osman Hadi Archive - বাংলাদেশের বীর সন্তানদের স্মরণে
                    </p>
                    <p className="footer-description">
                        এই ওয়েবসাইটে আমরা সেই সকল সাহসী মানুষদের আর্কাইভ করি যারা বাংলাদেশের জন্য জীবন উৎসর্গ করেছেন।
                        সৎ, দেশপ্রেমিক এবং নিঃস্বার্থ বীরদের স্মৃতি চিরকাল অম্লান থাকবে।
                    </p>
                </div>
            </div>
        </footer>
    );
}
