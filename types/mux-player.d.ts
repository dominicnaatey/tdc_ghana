declare namespace JSX {
  interface IntrinsicElements {
    'mux-player': {
      'playback-id'?: string;
      'metadata-video-title'?: string;
      'metadata-viewer-user-id'?: string;
      autoplay?: string | boolean;
      loop?: boolean;
      muted?: boolean;
      controls?: boolean;
      style?: React.CSSProperties;
      className?: string;
      [key: string]: any;
    };
  }
}