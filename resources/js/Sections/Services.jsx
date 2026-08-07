import React from 'react';
import SectionTitle from '../Components/SectionTitle';
import ServiceCard from '../Components/ServiceCard';
import { services } from '../data/portfolioData';

export default function Services() {
    return (
        <section id="services" className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="What I Do" subtitle="Services" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
