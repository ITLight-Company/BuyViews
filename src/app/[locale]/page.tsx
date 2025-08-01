'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { PackageSelection } from '@/components/PackageSelection'
import { OrderForm } from '@/components/OrderForm'
import { Package, CustomPackage, ServiceType, OrderData } from '@/types'
import { youtubePackages, websitePackages } from '@/lib/packages'
import { getApiUrl } from '@/lib/utils'
import { Youtube, Globe, ArrowLeft } from 'lucide-react'
import { useLocale } from 'next-intl'

export const dynamic = 'force-static'

type Step = 'hero' | 'service-select' | 'packages' | 'order'

export default function HomePage() {
    const locale = useLocale()
    const [currentStep, setCurrentStep] = useState<Step>('hero')
    const [serviceType, setServiceType] = useState<ServiceType>('youtube')
    const [selectedPackage, setSelectedPackage] = useState<Package>()
    const [customPackage, setCustomPackage] = useState<CustomPackage>()

    const handleGetStarted = () => {
        setCurrentStep('service-select')
    }

    const handleServiceSelect = (service: ServiceType) => {
        setServiceType(service)

        // Auto-select Growth package for YouTube service
        if (service === 'youtube') {
            const growthPackage = youtubePackages.find(pkg => pkg.id === 'yt-growth')
            if (growthPackage) {
                setSelectedPackage(growthPackage)
            }
        } else {
            // For website service, auto-select the popular package
            const popularWebPackage = websitePackages.find(pkg => pkg.popular)
            if (popularWebPackage) {
                setSelectedPackage(popularWebPackage)
            }
        }

        setCustomPackage(undefined)
        setCurrentStep('packages')
    }

    const handlePackageSelect = (pkg: Package) => {
        setSelectedPackage(pkg)
        setCustomPackage(undefined)
    }

    const handleCustomPackageCreate = (pkg: CustomPackage) => {
        setCustomPackage(pkg)
        setSelectedPackage(undefined)
    }

    const handlePayment = async (orderData: OrderData) => {
        try {
            const response = await fetch(`${getApiUrl()}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    package: orderData.package,
                    customPackage: orderData.customPackage,
                    customerInfo: {
                        email: orderData.email,
                        targetUrl: orderData.targetUrl,
                        name: orderData.name,
                    },
                    serviceType,
                    locale: locale,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('API Error:', errorData)
                throw new Error(errorData.details || 'Failed to create checkout session')
            }

            const { url } = await response.json()
            window.location.href = url
        } catch (error) {
            console.error('Payment error:', error)
            alert('Payment failed. Please try again.')
        }
    }

    const handleBackToPackages = () => {
        setCurrentStep('packages')

        // Restore default package selection based on service type
        if (serviceType === 'youtube') {
            const growthPackage = youtubePackages.find(pkg => pkg.id === 'yt-growth')
            if (growthPackage) {
                setSelectedPackage(growthPackage)
            }
        } else {
            const popularWebPackage = websitePackages.find(pkg => pkg.popular)
            if (popularWebPackage) {
                setSelectedPackage(popularWebPackage)
            }
        }

        setCustomPackage(undefined)
    }

    const currentPackages = serviceType === 'youtube' ? youtubePackages : websitePackages

    return (
        <div className="min-h-screen">
            {currentStep === 'hero' && (
                <>
                    <HeroSection onGetStarted={handleGetStarted} />
                    <FeaturesSection onGetStarted={handleGetStarted} />
                </>
            )}

            {currentStep === 'service-select' && (
                <div className="service-selection">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="service-header">
                                <h2 className="service-title">Choose Your Service</h2>
                                <p className="service-subtitle">
                                    What would you like to boost today?
                                </p>
                            </div>

                            <div className="service-cards">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="service-card"
                                    onClick={() => handleServiceSelect('youtube')}
                                >
                                    <div className="service-content">
                                        <Youtube className="service-icon youtube" />
                                        <h3 className="service-name">YouTube Views</h3>
                                        <p className="service-description">
                                            Boost your video views and engagement
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="service-card"
                                    onClick={() => handleServiceSelect('website')}
                                >
                                    <div className="service-content">
                                        <Globe className="service-icon website" />
                                        <h3 className="service-name">Website Traffic</h3>
                                        <p className="service-description">
                                            Increase your website visitors and engagement
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            {currentStep === 'packages' && (
                <div className="package-selection">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="package-header">
                                <button
                                    className="btn btn-secondary back-button"
                                    onClick={() => setCurrentStep('service-select')}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Change Service
                                </button>
                                <h2 className="package-title">
                                    {serviceType === 'youtube' ? 'YouTube' : 'Website'} Packages
                                </h2>
                            </div>

                            <PackageSelection
                                packages={currentPackages}
                                onPackageSelect={handlePackageSelect}
                                onCustomPackageCreate={handleCustomPackageCreate}
                                selectedPackage={selectedPackage}
                                selectedCustomPackage={customPackage}
                            />

                            {(selectedPackage || customPackage) && (
                                <div className="proceed-order-section">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={() => setCurrentStep('order')}
                                    >
                                        Proceed to Order
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}

            {currentStep === 'order' && (
                <div className="order-section">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="order-content space-y-12"
                    >
                        <div className="text-center">
                            <button
                                className="back-button"
                                onClick={handleBackToPackages}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Packages
                            </button>
                        </div>

                        <OrderForm
                            selectedPackage={selectedPackage}
                            customPackage={customPackage}
                            onSubmit={handlePayment}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    )
}
