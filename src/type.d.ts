declare module 'virtual:config' {
  const Config: import('astro-pure/types').ConfigOutput
  export default Config
}

interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
}