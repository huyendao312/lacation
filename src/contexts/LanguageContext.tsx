import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'vi' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'it' | 'pt';

export const languagesList: { code: LanguageCode; name: string }[] = [
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'ko', name: '한국어 (Korean)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'it', name: 'Italiano (Italian)' },
  { code: 'pt', name: 'Português (Portuguese)' },
];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: { 
    explore: 'Explore', map: 'Map', chat: 'Ask AI', community: 'Community', profile: 'Profile', 
    settings: 'Settings', appearance: 'Appearance', language: 'Language', theme: 'Theme', 
    done: 'Done', customColors: 'Pastel Colors (Gen Z)', 'AR Compass': 'AR Compass Navigation',
    routeThere: 'Route There', openInMaps: 'Open in Maps'
  },
  vi: { 
    explore: 'Khám phá', map: 'Bản đồ', chat: 'Hỏi AI', community: 'Cộng đồng', profile: 'Hồ sơ', 
    settings: 'Cài đặt', appearance: 'Giao diện', language: 'Ngôn ngữ', theme: 'Chủ đề', 
    done: 'Xong', customColors: 'Màu Pastel (Gen Z)', 'AR Compass': 'Điều hướng AR',
    routeThere: 'Chỉ đường', openInMaps: 'Mở Google Maps'
  },
  es: { 
    explore: 'Explorar', map: 'Mapa', chat: 'Asistencia AI', community: 'Comunidad', profile: 'Perfil', 
    settings: 'Ajustes', appearance: 'Apariencia', language: 'Idioma', theme: 'Tema', 
    done: 'Hecho', customColors: 'Colores Pastel (Gen Z)', 'AR Compass': 'Navegación AR',
    routeThere: 'Ir allí', openInMaps: 'Abrir en Maps'
  },
  fr: { 
    explore: 'Explorer', map: 'Carte', chat: 'Demander à l\'IA', community: 'Communauté', profile: 'Profil', 
    settings: 'Paramètres', appearance: 'Apparence', language: 'Langue', theme: 'Thème', 
    done: 'Terminé', customColors: 'Couleurs Pastel (Gen Z)', 'AR Compass': 'Navigation AR',
    routeThere: 'Y aller', openInMaps: 'Ouvrir dans Maps'
  },
  de: { 
    explore: 'Erkunden', map: 'Karte', chat: 'KI fragen', community: 'Gemeinschaft', profile: 'Profil', 
    settings: 'Einstellungen', appearance: 'Erscheinungsbild', language: 'Sprache', theme: 'Thema', 
    done: 'Fertig', customColors: 'Pastellfarben (Gen Z)', 'AR Compass': 'AR-Navigation',
    routeThere: 'Dorthin navigieren', openInMaps: 'In Maps öffnen'
  },
  zh: { 
    explore: '探索', map: '地图', chat: '询问AI', community: '社区', profile: '个人资料', 
    settings: '设置', appearance: '外观', language: '语言', theme: '主题', 
    done: '完成', customColors: '柔和色彩 (Gen Z)', 'AR Compass': 'AR 导航',
    routeThere: '路线', openInMaps: '在地图中打开'
  },
  ja: { 
    explore: '探索', map: '地図', chat: 'AIに聞く', community: 'コミュニティ', profile: 'プロフィール', 
    settings: '設定', appearance: '外観', language: '言語', theme: 'テーマ', 
    done: '完了', customColors: 'パステルカラー (Gen Z)', 'AR Compass': 'ARナビゲーション',
    routeThere: 'ルート', openInMaps: 'マップで開く'
  },
  ko: { 
    explore: '탐색', map: '지도', chat: 'AI 문의', community: '커뮤니티', profile: '프로필', 
    settings: '설정', appearance: '모양', language: '언어', theme: '테마', 
    done: '완료', customColors: '파스텔 톤 (Gen Z)', 'AR Compass': 'AR 내비게이션',
    routeThere: '경로', openInMaps: '지도에서 열기'
  },
  it: { 
    explore: 'Esplora', map: 'Mappa', chat: 'Chiedi all\'IA', community: 'Comunità', profile: 'Profilo', 
    settings: 'Impostazioni', appearance: 'Aspetto', language: 'Lingua', theme: 'Tema', 
    done: 'Fatto', customColors: 'Colori Pastello (Gen Z)', 'AR Compass': 'Navigazione AR',
    routeThere: 'Vai lì', openInMaps: 'Apri in Maps'
  },
  pt: { 
    explore: 'Explorar', map: 'Mapa', chat: 'Pergunte à IA', community: 'Comunidade', profile: 'Perfil', 
    settings: 'Configurações', appearance: 'Aparência', language: 'Idioma', theme: 'Tema', 
    done: 'Concluído', customColors: 'Cores Pastel (Gen Z)', 'AR Compass': 'Navegação AR',
    routeThere: 'Ir para lá', openInMaps: 'Abrir no Maps'
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('vi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
