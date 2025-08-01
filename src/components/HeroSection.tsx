'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Users, Zap, Shield, Clock } from 'lucide-react'

interface HeroSectionProps {
    onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
    const t = useTranslations('hero')

    return (
        <div className="hero-section">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>

            <div className="container">
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero-badge">
                            <Zap className="icon" />
                            <span>Boost Your Online Presence Today</span>
                        </div>

                        <h1 className="hero-title">
                            {t('title')}
                        </h1>

                        <p className="hero-subtitle">
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-buttons"
                    >
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={onGetStarted}
                        >
                            {t('cta')}
                            <ArrowRight className="icon" />
                        </button>

                        <button className="btn btn-secondary btn-lg">
                            <Play className="icon" />
                            {t('watchDemo')}
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hero-stats"
                    >
                        <div className="hero-stat">
                            <span className="stat-number">1M+</span>
                            <span className="stat-label">Views Delivered</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">50K+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support Available</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="hero-trust"
                    >
                        <div className="trust-item">
                            <Shield className="icon" />
                            <span>100% Safe</span>
                        </div>
                        <div className="trust-item">
                            <Clock className="icon" />
                            <span>Instant Delivery</span>
                        </div>
                        <div className="trust-item">
                            <Users className="icon" />
                            <span>Real Users</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
