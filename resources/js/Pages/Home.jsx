import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Skills from '../Sections/Skills';
import Projects from '../Sections/Projects';
import Experience from '../Sections/Experience';
import Education from '../Sections/Education';
import Services from '../Sections/Services';
import Contact from '../Sections/Contact';

export default function Home() {
    const { projects } = usePage().props;

    return (
        <MainLayout>
            <Head title="Muhammad Irfan Nuril Anwar — Web & Mobile Developer" />
            <Hero />
            <About />
            <Skills />
            <Projects projects={projects || []} />
            <Experience />
            {/* <Education /> */}
            {/* <Services /> */}
            <Contact />
        </MainLayout>
    );
}
