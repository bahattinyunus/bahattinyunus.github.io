import { useState } from "react";
import { CyberCard, GlitchText, HexBadge, SectionHeader } from "@/components/ui-custom";
import { profileData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github, Linkedin, Terminal, Shield, Cpu, Code, ExternalLink, Globe, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProjects = selectedCategory
    ? profileData.featured_projects.filter(project =>
        profileData.categories[selectedCategory as keyof typeof profileData.categories]?.includes(project.name)
      )
    : profileData.featured_projects;
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#0a0f1c_1px,transparent_1px),linear-gradient(to_bottom,#0a0f1c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <div className="font-display font-bold text-xl tracking-tighter flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span>BAHATTIN<span className="text-primary">YUNUS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">_HAKKINDA</a>
            <a href="#skills" className="hover:text-primary transition-colors">_YETENEKLER</a>
            <a href="#projects" className="hover:text-primary transition-colors">_PROJELER</a>
            <a href="#contact" className="hover:text-primary transition-colors">_İLETİŞİM</a>
          </div>
          <Button variant="outline" size="sm" className="font-mono text-xs border-primary/50 text-primary hover:bg-primary/10" asChild>
            <a href={profileData.personal.github_url} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" /> GITHUB
            </a>
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <section className="container min-h-[80vh] flex flex-col justify-center items-start relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="font-mono text-primary text-sm tracking-widest">SİSTEM ÇEVRİMİÇİ</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
              <span className="block text-muted-foreground/50 text-2xl md:text-4xl mb-2 font-light">Mimari</span>
              <GlitchText text="AKILLI" /> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">EKOSİSTEMLER</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-light leading-relaxed border-l-2 border-primary/30 pl-6">
              {profileData.personal.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono" asChild>
                <a href="#projects">
                  PROJELERİ İNCELE <Terminal className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-mono" asChild>
                <a href={profileData.personal.linkedin_url} target="_blank" rel="noopener noreferrer">
                  LINKEDIN PROFİLİ <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full border-t border-white/5 pt-8">
            {[
              { label: "Toplam Repo", value: profileData.github_stats.public_repos },
              { label: "Github Yıldızları", value: profileData.github_stats.total_stars },
              { label: "Global Sıralama", value: "#1,240" },
              { label: "Python Sıralaması (TR)", value: "#12" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">{stat.value}</span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container py-20">
          <SectionHeader title="Sistem Mimarisi" subtitle="Akademik bürokrasiden ziyade derin teknik uzmanlığı önceleyen pragmatik mühendislik felsefesi." />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-card">
                <img src={profileData.personal.avatar_url} alt="Avatar" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-display font-bold text-white">{profileData.personal.name}</h3>
                  <p className="text-primary font-mono text-sm">{profileData.personal.location}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {profileData.personal.bio}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CyberCard className="p-4 flex items-start gap-3">
                  <Shield className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Siber Güvenlik</h4>
                    <p className="text-xs text-muted-foreground">Gerçek zamanlı evrilen, proaktif ve yapay zeka destekli güvenlik çerçeveleri.</p>
                  </div>
                </CyberCard>
                <CyberCard className="p-4 flex items-start gap-3">
                  <Cpu className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Yapay Zeka Sistemleri</h4>
                    <p className="text-xs text-muted-foreground">Kendi kendini savunan ve gelişen akıllı ekosistemler.</p>
                  </div>
                </CyberCard>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container py-20 bg-white/5 rounded-3xl my-10 border border-white/5">
          <SectionHeader title="Teknik Cephanelik" subtitle="Akıllı sistemler inşa etmek için kullanılan araçlar ve teknolojiler." />
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" /> Diller & Çekirdek
              </h3>
              <div className="space-y-4">
                {profileData.skills.languages.map((lang, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm text-white group-hover:text-primary transition-colors">{lang}</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" /> Alanlar & Uzmanlık
              </h3>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.concepts.map((domain, i) => (
                  <HexBadge key={i} className="text-sm py-2 px-4">
                    {domain}
                  </HexBadge>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-card/50 rounded-lg border border-white/5">
                <h4 className="font-bold text-white mb-2">Mühendislik Felsefesi</h4>
                <p className="text-sm text-muted-foreground italic">
                  Pragmatik mühendislik felsefesini teknik uzmanlığın merkezine koyarak, akademik bürokrasi yerine ölçeklenebilir ve yüksek performanslı çözümlere odaklanıyorum. Yapay Zeka, Siber Güvenlik ve Savunma Sistemleri disiplinlerini entegre ederek; yalnızca çalışan değil, aynı zamanda kendi kendini savunan ve dinamik koşullara uyum sağlayarak evrilen zeki ekosistemler inşa ediyorum. Sistem mimarisine olan bütünsel yaklaşımımı, 'asla pes etmeyen' bir operasyonel disiplinle birleştirerek, teknolojik dönüşümün geleceğinde dayanıklı ve otonom dijital altyapılar tasarlamayı hedefliyorum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container py-20">
          <SectionHeader title="Yayındaki Sistemler" subtitle="Mimari yetenekleri gösteren seçilmiş çalışmalar." />
          
          {/* Category Filter */}
          <div className="mb-10 overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-max">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                className={`font-mono text-xs whitespace-nowrap ${
                  selectedCategory === null
                    ? "bg-primary text-white"
                    : "border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                TÜM PROJELERİ GÖSTER
              </Button>
              {Object.keys(profileData.categories).map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`font-mono text-xs whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "border-primary/30 text-primary hover:bg-primary/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <CyberCard key={i} className="flex flex-col h-full p-0 group">
                <div className="relative h-48 overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 z-20">
                    <HexBadge className="bg-black/50 backdrop-blur-md border-white/20 text-xs">
                      {project.language || "Sistem"}
                    </HexBadge>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> {project.stars}</span>
                      <span className="flex items-center gap-1"><span className="text-white">⑂</span> {project.forks}</span>
                    </div>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary hover:text-white transition-colors flex items-center gap-1"
                    >
                      KAYNAK_KODU <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CyberCard>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="font-mono border-primary/30 text-primary hover:bg-primary/10" asChild>
              <a href={profileData.personal.github_url} target="_blank" rel="noopener noreferrer">
                TÜM REPOLARI GITHUB'DA GÖRÜNTÜLE
              </a>
            </Button>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <h2 className="text-3xl md:text-4xl font-bold text-center font-display">
                <span className="text-primary">_</span>YAZILARIM
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.blog_posts.map((post, index) => (
                <a 
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-card/30 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs border-primary/20">
                        Medium
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 relative z-20">
                    <div className="text-xs text-muted-foreground mb-2 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {post.date}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors font-display">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.summary}
                    </p>
                    <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      OKUMAYA DEVAM ET <ArrowUpRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href={profileData.personal.medium_url || "https://medium.com/@bahattinyunus"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary group">
                  TÜM YAZILARI GÖR
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <h2 className="text-3xl md:text-4xl font-bold text-center font-display">
                <span className="text-primary">_</span>SERTİFİKALAR
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(profileData.certificates).map(([category, certs]) => (
                <div key={category} className="space-y-3">
                  <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
                    <span className="text-primary">▸</span> {category}
                  </h3>
                  <div className="space-y-2">
                    {certs.map((cert, idx) => (
                      <div key={idx} className="p-3 bg-card/30 backdrop-blur-sm border border-white/5 rounded-lg hover:border-primary/30 transition-colors group">
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{cert.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{cert.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-20 mb-20">
          <div className="bg-gradient-to-br from-card to-background border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  İşbirliğine <span className="text-primary">Hazır mısınız?</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Sistem mimarisi, yapay zeka güvenlik çerçeveleri ve yenilikçi mühendislik zorluklarını tartışmaya açığım.
                </p>
                
                <div className="space-y-4">
                  <a href={profileData.personal.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">LinkedIn</h4>
                      <p className="text-xs text-muted-foreground">Profesyonel bağlantı kurun</p>
                    </div>
                  </a>
                  
                  <a href={profileData.personal.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">GitHub</h4>
                      <p className="text-xs text-muted-foreground">Kodları ve katkıları inceleyin</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Konum</h4>
                      <p className="text-xs text-muted-foreground">{profileData.personal.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-4 border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Terminal className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-display font-bold text-white">SİSTEM DURUMU</h3>
                      <p className="text-primary font-mono text-sm mt-2 animate-pulse">● OPERASYONEL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} BAHATTIN YUNUS CETIN. TÜM HAKLARI SAKLIDIR.
          </div>
          <div className="flex items-center gap-6">
            <a href={profileData.personal.github_url} className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={profileData.personal.linkedin_url} className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
