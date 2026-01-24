import { useState, memo } from 'react';
import { Html, Float } from '@react-three/drei';
import { personalInfo, zonePositions } from '../../data/portfolio';
import { useZoneVisibility } from '../../hooks/useZoneVisibility';
import { useIsMobile } from '../../hooks/useIsMobile';

// FormSubmit.co - No signup, no API key required!
// Emails will be sent directly to this address
// First submission will require email confirmation (one-time)
const YOUR_EMAIL = 'Rajgkp2932002@gmail.com';

export const TerminalCore = memo(function TerminalCore() {
    const z = zonePositions.contact.z;
    const isVisible = useZoneVisibility(z);
    const isMobile = useIsMobile();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || 'Not provided',
                    subject: formData.subject || 'Contact from 3D Portfolio',
                    message: formData.message,
                    _subject: `New message from ${formData.name} - 3D Portfolio`,
                    _template: 'table',
                })
            });

            const result = await response.json();

            if (result.success) {
                console.log('FormSubmit success:', result);
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                console.error('FormSubmit error:', result);
                throw new Error(result.message || 'Failed to send');
            }
        } catch (error: any) {
            setSubmitStatus('error');
            setErrorMessage('Failed to send message. Please try again.');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <group position={[0, 0, z]}>
            {/* Section Header */}
            <Html
                position={[0, isMobile ? 5 : 6, 0]}
                center
                transform
                distanceFactor={isMobile ? 8 : 12}
            >
                <div className={`text-center ${isMobile ? 'w-[280px]' : 'w-[400px]'}`}>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">Contact</span>
                    <h2 className={`font-display font-bold mt-1 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                        Let's <span className="text-gradient">Connect</span>
                    </h2>
                </div>
            </Html>

            {/* Mobile: Stacked layout */}
            {isMobile ? (
                <>
                    {/* Contact Quick Info */}
                    <Html position={[0, 1.5, 0]} center transform distanceFactor={7}>
                        <div className="w-[260px] p-3 rounded-xl glass">
                            <div className="flex justify-around mb-3">
                                <a href={`mailto:${personalInfo.email}`} className="text-center">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-[9px] text-gray-400">Email</span>
                                </a>
                                <a href={`tel:${personalInfo.phone}`} className="text-center">
                                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-1">
                                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span className="text-[9px] text-gray-400">Phone</span>
                                </a>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <span className="text-green-400 font-mono font-bold text-[10px]">✓ OPEN FOR WORK</span>
                            </div>
                        </div>
                    </Html>

                    {/* Mobile Form */}
                    <Html position={[0, -2.5, 0]} center transform distanceFactor={7}>
                        <div className="w-[260px] p-3 rounded-xl glass">
                            <h3 className="text-xs font-bold mb-2 text-center">Send a Message</h3>

                            {submitStatus === 'success' && (
                                <div className="mb-2 p-2 rounded bg-green-500/10 text-green-400 text-[10px] text-center">
                                    ✓ Message sent! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-2 p-2 rounded bg-red-500/10 text-red-400 text-[10px] text-center">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-2">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Name"
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white placeholder:text-gray-500"
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Email"
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white placeholder:text-gray-500"
                                />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Phone Number"
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white placeholder:text-gray-500"
                                />
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Subject"
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white placeholder:text-gray-500"
                                />
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Message..."
                                    required
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white placeholder:text-gray-500 resize-none"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 bg-primary text-black font-bold rounded-lg text-xs disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </Html>
                </>
            ) : (
                <>
                    {/* Desktop: Side by side layout */}
                    <Float speed={0.6} rotationIntensity={0.008} floatIntensity={0.03}>
                        <Html position={[-4, 0, 0]} transform distanceFactor={12}>
                            <div className="w-[260px] space-y-3">
                                <div className="p-4 rounded-xl glass">
                                    <h3 className="text-sm font-bold mb-3">Contact Details</h3>
                                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-gray-500 font-mono uppercase">Email</div>
                                            <div className="text-xs font-medium">{personalInfo.email}</div>
                                        </div>
                                    </a>
                                    <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-gray-500 font-mono uppercase">Phone</div>
                                            <div className="text-xs font-medium">{personalInfo.phone}</div>
                                        </div>
                                    </a>
                                </div>

                                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-green-400 font-mono font-bold text-xs">OPEN FOR WORK</span>
                                    </div>
                                    <p className="text-gray-400 text-[10px]">
                                        Response within 24 hours.
                                    </p>
                                </div>
                            </div>
                        </Html>
                    </Float>

                    <Float speed={0.5} rotationIntensity={0.005} floatIntensity={0.02}>
                        <Html position={[4, 0, 0]} transform distanceFactor={12}>
                            <div className="w-[300px] p-4 rounded-xl glass">
                                <h3 className="text-sm font-bold mb-3">Send a Message</h3>

                                {submitStatus === 'success' && (
                                    <div className="mb-3 p-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs">
                                        ✓ Message sent! I'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                                        {errorMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Name"
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-xs text-white placeholder:text-gray-500"
                                        />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Email"
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-xs text-white placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="Phone Number"
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-xs text-white placeholder:text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="Subject"
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-xs text-white placeholder:text-gray-500"
                                        />
                                    </div>

                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Your message..."
                                        required
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-xs text-white placeholder:text-gray-500 resize-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 text-xs"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </Html>
                    </Float>
                </>
            )}

            <pointLight position={[0, 3, 5]} intensity={0.3} color="#ffffff" distance={20} />
        </group>
    );
});
