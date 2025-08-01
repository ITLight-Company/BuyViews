'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, Shield, Clock } from 'lucide-react'

interface FeaturesSectionProps {
    onGetStarted: () => void
}

export function FeaturesSection({ onGetStarted }: FeaturesSectionProps) {
    const tFeatures = useTranslations('features')

    const features = [
        {
            icon: Users,
            title: tFeatures('realViewers.title'),
            description: tFeatures('realViewers.description')
        },
        {
            icon: Zap,
            title: tFeatures('fastDelivery.title'),
            description: tFeatures('fastDelivery.description')
        },
        {
            icon: Shield,
            title: tFeatures('safeSecure.title'),
            description: tFeatures('safeSecure.description')
        },
        {
            icon: Clock,
            title: tFeatures('support.title'),
            description: tFeatures('support.description')
        }
    ]

    return (
        <div className="features-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="features-header"
                >
                    <h2 className="features-title">
                        {tFeatures('title')}
                    </h2>
                    <p className="features-subtitle">
                        Why thousands of creators trust us to grow their online presence
                    </p>
                </motion.div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="feature-card"
                        >
                            <div className="feature-icon">
                                <feature.icon />
                            </div>
                            <h3 className="feature-title">
                                {feature.title}
                            </h3>
                            <p className="feature-description">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="features-cta"
                >
                    <div className="cta-card">
                        <h3 className="cta-title">Ready to get started?</h3>
                        <p className="cta-subtitle">Join thousands of satisfied customers today</p>
                        <button
                            onClick={onGetStarted}
                            className="btn btn-primary btn-lg"
                        >
                            Start Boosting Now
                            <ArrowRight className="icon" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
