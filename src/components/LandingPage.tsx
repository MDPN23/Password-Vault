import React from 'react';
import { Shield, Lock, Key, Eye, Smartphone, Cloud, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'Your passwords are encrypted with AES-256 encryption, the same standard used by banks and governments.',
    },
    {
      icon: Key,
      title: 'Smart Password Generation',
      description: 'Generate strong, unique passwords with our AI-powered algorithm that learns from security best practices.',
    },
    {
      icon: Eye,
      title: 'Breach Monitoring',
      description: 'Get instant alerts if any of your accounts are compromised in data breaches.',
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Sync',
      description: 'Access your passwords seamlessly across all your devices with real-time synchronization.',
    },
    {
      icon: Cloud,
      title: 'Secure Cloud Backup',
      description: 'Your encrypted vault is automatically backed up to the cloud, so you never lose your data.',
    },
    {
      icon: Lock,
      title: 'Zero-Knowledge Architecture',
      description: 'We can\'t see your passwords even if we wanted to. Your master password is the only key.',
    },
  ];

  const plans = [
    {
      name: 'Personal',
      price: 'Free',
      description: 'Perfect for individuals getting started',
      features: [
        'Store up to 50 passwords',
        'Password generator',
        'Basic security reports',
        'Mobile app access',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$3/month',
      description: 'Advanced features for power users',
      features: [
        'Unlimited password storage',
        'Advanced password generator',
        'Dark web monitoring',
        'Priority support',
        'Secure file storage',
        'Emergency access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Family',
      price: '$5/month',
      description: 'Protect your entire family',
      features: [
        'Everything in Premium',
        'Up to 6 family members',
        'Shared family vault',
        'Parental controls',
        'Family security dashboard',
      ],
      cta: 'Protect Family',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SecureVault</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your Digital Life,
              <span className="text-blue-600 block">Perfectly Protected</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop reusing weak passwords. SecureVault generates, stores, and autofills strong, unique passwords for every account. One master password protects them all.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-2 transition-colors">
                <span>Watch Demo</span>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-gray-600 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with the same security standards trusted by Fortune 500 companies, but designed for everyday users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Protection Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 transition-all duration-200 hover:shadow-lg ${
                  plan.popular
                    ? 'border-blue-500 shadow-lg relative'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login"
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 text-center block ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users who trust SecureVault to protect their most important accounts.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">SecureVault</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 SecureVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}