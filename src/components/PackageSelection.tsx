'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomPackageBuilder } from './CustomPackageBuilder'
import { Package, CustomPackage } from '@/types'
import { formatNumber } from '@/lib/utils'

interface PackageCardProps {
    package: Package
    onSelect: (pkg: Package) => void
    isSelected: boolean
}

function PackageCard({ package: pkg, onSelect, isSelected }: PackageCardProps) {
    const t = useTranslations('packages')

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
        >
            <div className={`package-card ${pkg.popular ? 'featured' : ''} ${isSelected ? 'selected' : ''}`}>
                {pkg.popular && (
                    <div className="package-badge">
                        <Star size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        {t('popular')}
                    </div>
                )}

                <div className="package-card-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <div className="package-views">{formatNumber(pkg.views)}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        views
                    </div>
                    <div className="package-price">
                        <span className="currency">$</span>{pkg.price}
                        {pkg.originalPrice && (
                            <div style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                                textDecoration: 'line-through',
                                marginTop: '4px'
                            }}>
                                ${pkg.originalPrice}
                            </div>
                        )}
                    </div>
                </div>

                <div className="package-content">
                    <h4 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>
                        {t('features')}:
                    </h4>
                    <ul className="package-features">
                        {pkg.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="package-footer">
                    <Button
                        className={`btn ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => onSelect(pkg)}
                        style={{ width: '100%' }}
                    >
                        {t('selectPackage')}
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

interface PackageSelectionProps {
    packages: Package[]
    onPackageSelect: (pkg: Package) => void
    onCustomPackageCreate: (pkg: CustomPackage) => void
    selectedPackage?: Package
    selectedCustomPackage?: CustomPackage
}

export function PackageSelection({
    packages,
    onPackageSelect,
    onCustomPackageCreate,
    selectedPackage,
    selectedCustomPackage
}: PackageSelectionProps) {
    const t = useTranslations('packages')

    return (
        <div className="package-selection">
            <div className="package-header">
                <h2 className="package-title">{t('title')}</h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    fontSize: 'var(--font-size-lg)'
                }}>
                    {t('subtitle')}
                </p>
            </div>

            <div className="packages-grid">
                {packages.map((pkg) => (
                    <PackageCard
                        key={pkg.id}
                        package={pkg}
                        onSelect={onPackageSelect}
                        isSelected={selectedPackage?.id === pkg.id}
                    />
                ))}

                {/* Custom Package Builder Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                >
                    <CustomPackageBuilder
                        onPackageCreate={onCustomPackageCreate}
                        selectedCustomPackage={selectedCustomPackage}
                    />
                </motion.div>
            </div>
        </div>
    )
}
