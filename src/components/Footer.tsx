'use client'

import { useTranslations } from 'next-intl'
import { Mail, Phone } from 'lucide-react'

export function Footer() {
    const t = useTranslations('footer')

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'var(--primary-gradient)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>BV</span>
                            </div>
                            <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>BuyViews</span>
                        </div>
                        <p className="footer-description">
                            Boost your online presence with real YouTube views and website traffic.
                            Safe, fast, and effective solutions for content creators and businesses.
                        </p>
                        <div className="social-links">
                            <a href="mailto:contact@prizeflair.com" aria-label="Email">
                                <Mail size={20} />
                            </a>
                            <a href="tel:+1234567890" aria-label="Phone">
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">{t('company')}</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="#about">About Us</a>
                            </li>
                            <li>
                                <a href="#how-it-works">How It Works</a>
                            </li>
                            <li>
                                <a href="#testimonials">Testimonials</a>
                            </li>
                            <li>
                                <a href="#blog">Blog</a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">{t('legal')}</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="#privacy">{t('privacyPolicy')}</a>
                            </li>
                            <li>
                                <a href="#terms">{t('termsOfService')}</a>
                            </li>
                            <li>
                                <a href="#refund">{t('refundPolicy')}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">{t('support')}</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="#help">{t('helpCenter')}</a>
                            </li>
                            <li>
                                <a href="mailto:contact@prizeflair.com">{t('contactUs')}</a>
                            </li>
                            <li>
                                <a href="#faq">{t('faq')}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{t('copyright')}</p>
                </div>
            </div>
        </footer>
    )
}
