'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function VSLPlayer() {
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [player, setPlayer] = useState<any>(null);

    useEffect(() => {
        // Load Vimeo SDK
        const script = document.createElement('script');
        script.src = "https://player.vimeo.com/api/player.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (iframeRef.current) {
                // @ts-ignore
                const vimeoPlayer = new window.Vimeo.Player(iframeRef.current);
                setPlayer(vimeoPlayer);

                // Ensure it starts muted (browser autoplay policy)
                vimeoPlayer.setVolume(0);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const toggleMute = () => {
        if (player) {
            player.getVolume().then((volume: number) => {
                const newVolume = volume === 0 ? 1 : 0;
                player.setVolume(newVolume);
                setIsMuted(newVolume === 0);
            });
        }
    };

    return (
        <div className="w-full aspect-video rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)] relative bg-black group">
            <iframe
                ref={iframeRef}
                src="https://player.vimeo.com/video/1148993755?title=0&byline=0&portrait=0&autoplay=1&muted=1&loop=1&autopause=0&controls=0"
                className="absolute inset-0 w-full h-full scale-[1.01]"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Pulse Agency VSL"
            ></iframe>

            {/* Control Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-end justify-end p-4 lg:p-6">
                <button
                    onClick={toggleMute}
                    className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-primary/80 hover:scale-105 active:scale-95 group/btn"
                    title={isMuted ? "Activar sonido" : "Silenciar"}
                >
                    {isMuted ? (
                        <>
                            <VolumeX className="w-5 h-5" />
                            <span className="text-sm font-medium pr-1">Activar Sonido</span>
                        </>
                    ) : (
                        <>
                            <Volume2 className="w-5 h-5 text-primary-foreground" />
                            <span className="text-sm font-medium pr-1">Silenciar</span>
                        </>
                    )}
                </button>
            </div>

            {/* Aesthetic mask to hide Vimeo logo/titles that appear briefly */}
            <div className="absolute inset-0 border-[6px] border-black pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>
    );
}
