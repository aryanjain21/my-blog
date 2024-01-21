import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
        <div className={classes.image}>
            <Image src="/images/site/arya.jpg" alt="An image showing Aryan" width={300} height={300} />
        </div>
        <h1>Hi, I&apos;m Aryan</h1>
        <p>
            I blog about web development.
        </p>
    </section>
  )
}

export default Hero;