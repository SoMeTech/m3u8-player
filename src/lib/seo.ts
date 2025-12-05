// SEO Configuration for M3U8 Player
// 为所有5种语言提供完整的SEO元数据

export const seoConfig = {
  'zh-CN': {
    title: 'M3U8播放器 - 免费在线M3U8/HLS播放器、下载器和转换器',
    description: '专业M3U8/HLS在线播放器，支持M3U8下载、M3U8转MP4、直播点播、自适应码率、字幕播放列表。免安装即时使用，完全免费。',
    keywords: 'M3U8播放器,M3U8下载,M3U8转MP4,HLS播放器,在线M3U8播放器,M3U8线上播放,线上HLS播放,直播播放器,串流播放器,网页视频播放器,自适应码率,字幕,播放列表,免费播放器',
  },
  'en': {
    title: 'M3U8 Player - Free Online M3U8/HLS Player, Downloader & Converter',
    description: 'Professional online M3U8/HLS player supporting live streaming and VOD. Free M3U8 downloader and MP4 converter. Adaptive bitrate, subtitles, playlist manager. No installation required.',
    keywords: 'M3U8 player,M3U8 downloader,M3U8 to MP4,HLS player,online M3U8 player,live streaming player,video streaming,web video player,adaptive bitrate,subtitles,playlist manager,free player',
  },
  'zh-TW': {
    title: 'M3U8播放器 - 免費線上M3U8/HLS播放器、下載器和轉換器',
    description: '專業M3U8/HLS線上播放器，支援M3U8下載、M3U8轉MP4、直播點播、自適應碼率、字幕播放清單。免安裝即時使用，完全免費。',
    keywords: 'M3U8播放器,M3U8下載,M3U8轉MP4,HLS播放器,線上M3U8播放器,M3U8線上播放,線上HLS播放,直播播放器,串流播放器,網頁視訊播放器,自適應碼率,字幕,播放清單,免費播放器',
  },
  'ja': {
    title: 'M3U8プレーヤー - 無料オンラインM3U8/HLSプレーヤー、ダウンローダー、コンバーター',
    description: 'プロフェッショナルなM3U8/HLSオンラインプレーヤー。M3U8ダウンロード、M3U8からMP4への変換、ライブ配信、VOD、アダプティブビットレート、字幕、プレイリスト対応。インストール不要、完全無料。',
    keywords: 'M3U8プレーヤー,M3U8ダウンロード,M3U8 MP4変換,HLSプレーヤー,オンラインM3U8プレーヤー,ライブ配信プレーヤー,ストリーミングプレーヤー,ウェブ動画プレーヤー,アダプティブビットレート,字幕,プレイリスト,無料プレーヤー',
  },
  'de': {
    title: 'M3U8 Player - Kostenloser Online M3U8/HLS Player, Downloader & Converter',
    description: 'Professioneller M3U8/HLS Online-Player mit Unterstützung für M3U8-Download, M3U8 zu MP4 Konvertierung, Live-Streaming, VOD, adaptive Bitrate, Untertitel und Playlist-Verwaltung. Keine Installation erforderlich, völlig kostenlos.',
    keywords: 'M3U8 Player,M3U8 Download,M3U8 zu MP4,HLS Player,Online M3U8 Player,Live-Streaming Player,Video-Streaming,Web-Video-Player,adaptive Bitrate,Untertitel,Playlist-Manager,kostenloser Player',
  },
};

export const defaultSEO = seoConfig['zh-CN'];

// 获取当前语言的SEO配置
export function getSEOConfig(lang: string = 'zh-CN') {
  return seoConfig[lang as keyof typeof seoConfig] || defaultSEO;
}
