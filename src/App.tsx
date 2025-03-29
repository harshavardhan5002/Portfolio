import React, { useEffect, useRef, useState } from 'react'; // Added useState
// Removed Moon, Sun icons. Kept others.
import { Github, Mail, FileText, Linkedin, Code2, Globe, Database, Wrench, Code, Server, GitBranch, Cloud, Cpu, Terminal, Settings, Palette, LayoutGrid, Component, Bot, TestTube, Monitor, FileCode, HardDrive, Brain, Smartphone, CloudCog, Shapes, GraduationCap, Trophy, Briefcase, Award, Menu, X } from 'lucide-react';
import useIntersectionObserver from './hooks/useIntersectionObserver';

// Removed ThemeToggle component definition

// Updated NavBar for Responsiveness
function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "#", text: "Home" },
    { href: "#skills", text: "Skills" },
    { href: "#projects", text: "Projects" },
    { href: "#achievements", text: "Achievements" },
    { href: "#internships-courses", text: "Internships & Courses" },
    { href: "#patents", text: "Patents" },
    { href: "#education", text: "Education" },
    { href: "#contact", text: "Contact" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Desktop Pill Navigation */}
      <div className="hidden md:flex items-center gap-3 p-2 rounded-full bg-white/30 dark:bg-gray-700/40 backdrop-blur-sm border border-white/20 dark:border-gray-600/50 shadow-md">
        {navLinks.map(link => (
          <a key={link.href} href={link.href} className="nav-pill">
            {link.text}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex justify-end w-full">
        <button
          onClick={toggleMobileMenu}
          className="nav-pill p-2" // Use nav-pill style for consistency
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full mt-2 right-4 w-48 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col py-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}


// Section (remains the same)
function Section({ children, id, className = '', centerContent = false }) {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.1, root: null, rootMargin: '0px' });
  const centeringClasses = centerContent ? 'flex items-center justify-center' : '';
  return (
    <section id={id} ref={ref} className={`min-h-screen py-20 ${centeringClasses} ${entry?.isIntersecting ? 'animate-fade-in' : 'opacity-0'} ${className}`}>
      {children}
    </section>
  );
}

// Updated IndividualSkillCard to always fade in from left
function IndividualSkillCard({ name, icon: Icon, index }) {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    root: null,
    rootMargin: '0px',
  });

  const animationDelay = `${(index % 10) * 60}ms`; // Adjusted stagger slightly
  const animationClass = 'animate-fade-in-left'; // Always fade left

  return (
    <div
      ref={ref}
      className={`individual-skill-card ${entry?.isIntersecting ? animationClass : 'opacity-0'}`}
      style={{ animationDelay }}
    >
      {/* Icon and text side-by-side */}
      {Icon && <Icon className="individual-skill-icon" />}
      <span className="font-medium text-md">{name}</span> {/* Adjusted text size slightly */}
    </div>
  );
}

// Reverted Card component (removed animationDirection)
function Card({ children, className = '', animationDirection = 'fade-in' }) {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    root: null,
    rootMargin: '0px',
  });

  // Default fade-in animation for general cards
  // Project cards will now also use this default fade-in
  const animationClass = 'animate-fade-in';

  return (
    <div
      ref={ref}
      className={`card-base w-full ${entry?.isIntersecting ? animationClass : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

// Project Description Component for bullet points
function ProjectDescription({ description }) {
  const points = description.split('•').map(p => p.trim()).filter(p => p);
  return (
    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mb-4">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}


function App() {
  // Categorized skills data
  const proficientSkills = [
    // Corrected icon: Replaced Window with Monitor
    { name: 'Windows', icon: Monitor }, { name: 'MS Office', icon: FileCode }, { name: 'C/C++', icon: Code },
    { name: 'Python', icon: Code }, { name: 'Embedded C', icon: HardDrive }
  ];
  const intermediateSkills = [
    { name: 'Linux (Ubuntu, Arch, Raspbian)', icon: Terminal }, { name: 'Java', icon: Code }, { name: 'JavaScript', icon: Code },
    { name: 'HTML', icon: Code }, { name: 'React', icon: Code }, { name: 'Node.js', icon: Server },
    { name: 'TypeScript', icon: Code }, { name: 'Tailwind CSS', icon: Palette }, { name: 'SQL', icon: Database },
    { name: 'AutoCAD', icon: Shapes }, { name: 'CATIA', icon: Shapes }, { name: 'Creo', icon: Shapes }, { name: 'SolidWorks', icon: Shapes },
    { name: 'STM CubeMX', icon: Cpu }, { name: 'STM IDE', icon: Cpu }
  ];
  const beginnerSkills = [
    { name: 'Assembly', icon: Brain }, { name: 'AWS - EC2', icon: CloudCog }, { name: 'Android Dev (Flutter Flow)', icon: Smartphone }
  ];

  // Updated Projects Data with image paths
  const projectsData = [
      {
          title: "Advanced QR Code System",
          description: "• Versatile QR Code Generation: Supports 14 versions and sizes for applications such as WiFi setup, contact saving, and product info.\n• Integrated Email Functionality: Enables direct sharing of QR codes via email for enhanced accessibility\n• Specialized QR Code Types: Designed for practical uses, including WiFi configuration and product detail",
          image: "/assets/1.jpg" // Assign image 1
      },
      {
          title: "QR Code-Based Student Management System with SQL Integration",
          description: "• Developed Secure QR Code Login: Created MySQL-based database for secure logins and tracking, leveraging QR codes for authentication\n• Designed Teacher Modules: Enabled QR code login for teachers, allowing them to input marks and manage student data efficiently\n• Implemented Data Visualization: Integrated matplotlib to generate dynamic graphs, providing students with visual insights into their performance trends.",
          image: "/assets/2.jpg" // Assign image 2
      },
      {
          title: "Kernel-Builder: Python-Based Linux Kernel Management Tool",
          description: "• Developed Cross-Distro Kernel-Builder Tool: Created a Python-based CLI utility to manage, build, and configure Linux kernels on both Arch and Ubuntu, published on GitHub and the Arch User Repository (AUR).\n• Automated End-to-End Kernel Operations: Streamlined kernel version fetching from kernel.org, applying patches (including PREEMPT_RT), generating .config files, compiling, and updating the bootloader with minimal user effort.\n• Enhanced Real-Time Kernel Performance at HCL Technologies: Upgraded a standard kernel to real-time during an internship, focusing on ext4 filesystem tuning and memory allocation to improve latency and system responsiveness.",
          image: "/assets/3.jpg" // Assign image 3
      },
      {
          title: "ZephyrAuto+ – Advanced Driver Assistance System (ADAS)",
          description: "• Innovative ADAS Prototype: Developed ZephyrAuto+ with features like Adaptive Evasive Maneuvering, Forward Collision Warning, Lane Guidance Assist, and Adaptive Cruise Control to enhance road safety\n• Real-Time Decision Algorithms: Utilized ultrasonic, IR, RFID, and vibration sensors for accurate hazard detection and collision prevention electric vehicles.\n• Implemented Adaptive Evasive Maneuvering (AEM): Designed a custom safety protocol enabling autonomous steering and emergency braking in real-time, significantly enhancing accident avoidance in dynamic road scenarios.",
          image: "/assets/4.jpg" // Assign image 4
      },
      {
          title: "ZephyrDrive+ - Wind Energy Regeneration System",
          description: "• Built a 3D-Printed Wind Turbine System with a 7kg Metal Mounting Frame, integrating a 12V DC geared motor and Love Jaw coupling, designed for in-motion wind energy harvesting in electric vehicles.\n• Developed a Custom BMS Supporting Simultaneous Charging and Discharging, enabling dynamic energy routing and real-time load balancing to maximize power recovery during motion.\n• Extended EV Battery Range While Reducing Lithium Dependency, by supplementing energy with regenerative wind input—allowing for smaller battery packs without compromising vehicle performance or range.",
          image: "/assets/5.jpg" // Assign image 5
      },
      {
          title: "Computer Vision-Based Driving Assistance System",
          description: "• Developed a Real-Time Driving Assistance System using MobileNet SSD, Canny Edge Detection, and Tesseract OCR to perform object detection, lane tracking, and license plate recognition with up to 92% accuracy.\n• Integrated Proximity-Based Collision Prediction using camera calibration and Time-to-Collision (TTC) estimation, enabling early warnings for accident prevention in dynamic driving scenarios.\n• Implemented CAN Protocol and Socket Communication between PC and Raspberry Pi, allowing low-latency data exchange and real-time control of actuators like steering simulation through curvature angle feedback.",
          image: "/assets/6.jpg" // Assign image 6
      },
      {
          title: "Android App for Ambulance Booking and Hospital Management",
          description: "• Ambulance Booking System: Developed quick ambulance navigation to nearby hospitals\n• Integrated Hospital Management: Provided real-time updates on bed availability and hospital resources\n• Generative AI Prediction Systems: Predicts ailment condition of patient from the ambulance and patients history and suggests whether admission is required.",
          image: "/assets/7.jpg" // Assign image 7
      },
      {
          title: "Blitzkrieg 2K25 Symposium Website",
          description: "• Built and Deployed a Responsive Web Application for a college symposium using React, HTML/CSS, and hosted on Netlify for high performance and accessibility.\n• Integrated Google Forms and Apps Script to manage 200+ registrations from various colleges, automate confirmation emails with unique ID generation, and streamline backend operations.\n• Implemented Seamless Frontend-Workflow Integration, leveraging React and Google Workspace tools to deliver a smooth, efficient user experience.",
          image: "/assets/8.jpg" // Assign image 8
      },
      {
          title: "Smart Non-Contact Voltage Detection and Monitoring System - Hyundai",
          description: "• Developed a Smart Non-Contact Voltage Detection System using the Hall Effect principle to accurately detect AC voltages from 220V to 440V, providing real-time amplitude display to prevent live wire puncture during drilling operations.\n• Enabled Stray Capacitance Detection and Safety Alerts, allowing operators to identify charge buildup on their body and discharge safely—especially crucial in sensitive environments like aluminum foundries.\n• Integrated Multi-Sensor Monitoring with temperature (MLX90614), pressure/altitude (BMP280), and adaptive LED indicators, offering comprehensive safety feedback via OLED display and serial output for use in deep or hazardous zones.",
          image: "/assets/9.jpg" // Assign image 9
      },
      {
          title: "Inventory Maintenance and Stock Book Android Web App – Hyundai",
          description: "• Built a Web-Based Maintenance Stock Explorer using HTML, CSS, and JavaScript, integrated with Google Drive to fetch Excel files, convert them to CSV, and parse stock data in real-time.\n• Implemented Dynamic Search and Filter Logic with full detail transparency, allowing users to quickly locate materials and access specifications, quantities, and part history with ease.\n• Eliminated Manual Updates and Reduced 4+ Hours of Daily Downtime by automating the SAP-to-Google Drive workflow, enabling instant data sync and improving overall production efficiency.",
          image: "/assets/10.jpg" // Assign image 10
      },
      {
          title: "Speed breaker and Pothole Detection System with Dashboard",
          description: "• Engineered a Real-Time Road Anomaly Detection System by integrating YOLOv8 object detection with Arduino-based ultrasonic sensors, enabling accurate identification of potholes, bumps, and road hazards.\n• Mapped Anomalies with Precise Geolocation Markers using Leaflet.js, allowing authorities to visually pinpoint affected areas and prioritize maintenance actions efficiently.\n• Built a Full-Stack Monitoring Dashboard using Python, Node.js, and Socket.IO, streaming live sensor data and confirmed anomaly reports—empowering civic bodies with actionable insights for rapid rectification.",
          image: "/assets/11.jpg" // Assign image 11
      },
      {
          title: "Adaptive Traffic Density Controller using Computer Vision",
          description: "• Designed and Implemented an Adaptive Traffic Signal System using Python, OpenCV, and YOLO, capable of detecting real-time vehicle density to dynamically calculate optimum green signal duration.\n• Integrated Raspberry Pi with Traffic Junction Hardware, enabling live video capture, on-device vehicle counting, and automated control of traffic lights through GPIO pins.\n• Achieved a 79.1% Traffic Flow Efficiency, significantly improving over the 69.4% of traditional systems—reducing congestion and increasing vehicular throughput by 5136 vehicles over 8 hours.",
          image: "/assets/12.jpg" // Assign image 12
      },
      {
          title: "Cross-Folder Duplicate Finder and Remover Using Content Hashing",
          description: "• Built an Intelligent Duplicate Media Detection Tool in Python that recursively scans folders and ZIP files to detect duplicate images and videos using MD5 hashing and size-based matching, even when filenames differ or files are nested in compressed archives.\n• Generated Comprehensive Reports outlining each duplicate’s original location, type, and size, and safely preserved the earliest modified copy while moving redundant files to the recycle bin to prevent accidental loss.\n• Designed an Intuitive, User-Controlled Workflow featuring real-time progress bars, ETA prediction, and a two-phase deep cleanup process that allows review, confirmation, and efficient disk space recovery with full transparency",
          image: "/assets/13.jpg" // Assign image 13
      }
  ];


  // Achievements Data
  const achievements = [
    { prize: "1st Prize (₹3,000)", event: "Science and Innovation Hackathon", location: "RMK Engineering College", year: 2023, description: "ZephyrAuto+: Level 2 ADAS System Prototype" },
    { prize: "1st Prize (₹6,000)", event: "RoboCage Hackathon", location: "IIITDM, Kancheepuram", year: 2024 },
    { prize: "1st Prize (₹10,000)", event: "Inter department Paper Presentation", location: "RMK Engineering College", year: 2024, description: "Wind Energy based battery recharging system for Electric Vehicles" },
    { prize: "Won (₹50,000)", event: "Startup Café", location: "Anna university – Zephyr Automotive", year: 2024 },
    { prize: "1st Prize (₹10,000)", event: "IEEE/L&T Smartathon", location: "St. Joseph Engineering College - Sustainability", year: 2025 },
    { prize: "2nd Prize (₹2,500)", event: "Mini Project Presentation", location: "RMK Engineering College", year: 2025, description: "AI Driven Vehicle and Driver Monitoring with CAN-Enabled HMI Interface" },
    { prize: "2 Papers Presented & Published", event: "Anna University / Institution of Engineers", location: "", year: 2024, description: "AI Driven Battery Health Monitoring, Recycling and Swapping systems" },
    { prize: "Paper Presented", event: "ICARECS 2025", location: "SRM Institute", year: 2025, description: "Future Research Agenda of Drivers and Barriers for connected Electric Vehicles" },
    { prize: "Paper Presented", event: "IIT Madras", location: "", year: 2019, description: "Eco-friendly Hydrogen based fuel Vehicle Concept" },
    { prize: "Project Presented", event: "AICTE IdeaFest 2025 Exhibition", location: "Delhi", year: 2025 },
  ];

  // Internships & Courses Data
  const internshipsCourses = [
    { title: "5G & Industrial IOT", location: "Hochschule Offenburg, Germany", duration: "2 Weeks" },
    { title: "Linux Kernel Development", location: "HCL Technologies", duration: "5 Months" },
    { title: "Embedded systems & IOT", location: "AICTE Idea Lab, RMKEC", duration: "3 Months" },
    { title: "Industrial Automation", location: "Lauritz Knudsen/L&T Vadodara", duration: "2 Weeks" },
    { title: "VLSI design and industrial application", location: "NSIC, Chennai", duration: "2 Weeks" },
    { title: "Power & Transmission", location: "Hyundai Motors, Sriperumbudur", duration: "2 Weeks" },
    { title: "Certificate course in Solid Works, AutoCAD, Creo & Catia", location: "", duration: "" },
  ];

  // Patents Data
  const patents = [
    { title: "Level 2 Advanced Driver Assistance System", number: "202441024942" },
    { title: "Wind energy-based battery recharging system for Electric Vehicles", number: "202541013363" },
    { title: "Non-Contact Voltage Detection and Monitoring System with Real-Time Safety Indication", number: "202541018648" },
    { title: "AI-Driven Vehicle and Driver Monitoring with CAN Network Enabled HMI Interface", number: "(Filed)" },
  ];


  useEffect(() => {
    // Set initial theme based on localStorage or system preference
    const isDark = localStorage.getItem('theme') === 'dark' ||
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Removed the dependency array to only run once on mount
  }, []);

  return (
    <div className="min-h-screen">
      {/* Removed ThemeToggle component call */}
      <NavBar />
      <main className="container mx-auto px-6">
        {/* About Section */}
        <Section id="about" centerContent={true}>
          <Card className="max-w-3xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              {/* Updated profile picture source */}
              <div className="flex-shrink-0"><img src="/assets/dp.jpg" alt="Profile" className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover shadow-lg border-4 border-teal-500 dark:border-teal-400" /></div>
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block mb-3 px-5 py-1 rounded-full bg-white/40 dark:bg-slate-700/70 backdrop-blur-sm border border-white/20 dark:border-slate-600/50 shadow-md dark:shadow-lg dark:shadow-teal-500/20 transition-shadow duration-300"><h1 className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-300">Harshavardhan S</h1></div>
                <p className="text-gray-700 dark:text-gray-300 text-md md:text-lg mb-4">A meticulous and organized individual with a strong interest in Electric Vehicles, Power,
                Energy, Automation, Mobility, Computer Vision, AI & ML.</p>
                <div className="flex gap-4 justify-center sm:justify-start"><a href="https://github.com/harshavardhan5002" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Github size={24} /></a><a href="https://www.linkedin.com/in/harshavardhan-somanathan/" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Linkedin size={24} /></a></div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Skills Section - Updated grid for pills */}
        <Section id="skills">
           <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white text-left">Skills</h2>
            {/* Proficient Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400">Proficient</h3>
              {/* Use flex wrap for pills */}
              <div className="flex flex-wrap gap-4">
                {proficientSkills.map((skill, i) => (
                  <IndividualSkillCard
                    key={`prof-${i}`}
                    {...skill}
                    index={i}
                  />
                ))}
              </div>
            </div>
            {/* Intermediate Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400">Intermediate</h3>
              <div className="flex flex-wrap gap-4">
                {intermediateSkills.map((skill, i) => (
                  <IndividualSkillCard
                    key={`int-${i}`}
                    {...skill}
                    index={i}
                  />
                ))}
              </div>
            </div>
            {/* Beginner Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400">Beginner</h3>
              <div className="flex flex-wrap gap-4">
                {beginnerSkills.map((skill, i) => (
                  <IndividualSkillCard
                    key={`beg-${i}`}
                    {...skill}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section - Updated with real data and images */}
        <Section id="projects">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white text-left">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project, i) => (
                <Card key={i}>
                  {/* Use the assigned image path */}
                  <img src={project.image} alt={project.title} className="rounded-lg mb-4 w-full h-48 object-cover bg-gray-200 dark:bg-gray-700" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-teal-400">{project.title}</h3>
                  {/* Use ProjectDescription component for bullet points */}
                  <ProjectDescription description={project.description} />
                  <div className="flex gap-4">
                    <a href="#" className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors">View Demo</a>
                    <a href="#" className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors">Source Code</a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Achievements Section */}
        <Section id="achievements" centerContent={true}>
          <Card className="max-w-4xl mx-auto"> {/* Increased max-width */}
            <div className="flex items-center gap-3 mb-8"> {/* Increased margin-bottom */}
              <Trophy size={28} className="text-teal-600 dark:text-teal-400" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-teal-400">Achievements</h3>
            </div>
            <div className="space-y-6">
              {achievements.map((ach, index) => (
                <div key={index} className="border-l-2 border-teal-600 dark:border-teal-500 pl-4">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{ach.prize}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {ach.event} {ach.location && `• ${ach.location}`} • {ach.year}
                  </p>
                  {ach.description && (
                    <p className="mt-1 text-gray-700 dark:text-gray-300 italic">"{ach.description}"</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Internships & Courses Section */}
        <Section id="internships-courses" centerContent={true}>
          <Card className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={28} className="text-teal-600 dark:text-teal-400" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-teal-400">Internships & Courses</h3>
            </div>
            <div className="space-y-6">
              {internshipsCourses.map((item, index) => (
                <div key={index} className="border-l-2 border-teal-600 dark:border-teal-500 pl-4">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.location && `${item.location}`} {item.duration && `• ${item.duration}`}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Patents Published Section */}
        <Section id="patents" centerContent={true}>
          <Card className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Award size={28} className="text-teal-600 dark:text-teal-400" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-teal-400">Patents Published</h3>
            </div>
            <div className="space-y-6">
              {patents.map((patent, index) => (
                <div key={index} className="border-l-2 border-teal-600 dark:border-teal-500 pl-4">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{patent.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {patent.number}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Education Section */}
        <Section id="education" centerContent={true}> {/* Changed id */}
          <Card className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6"> {/* Added icon */}
              <GraduationCap size={28} className="text-teal-600 dark:text-teal-400" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-teal-400">Education</h3>
            </div>
            {/* Removed Download CV button */}
            <div className="space-y-6">
              {/* B.E. */}
              <div className="border-l-2 border-teal-600 dark:border-teal-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">B.E. Electrical & Electronics</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">RMK Engineering college, Gummidipoondi • Dec 2024 (Expected)</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">III year - Pursuing • CGPA: 8.43</p>
              </div>
              {/* HSC */}
              <div className="border-l-2 border-teal-600 dark:border-teal-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Higher Secondary (HSC) - CBSE</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">DAV Senior Secondary school, Mogappair, Chennai • May 2022</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">Percentage: 93.80 %</p>
              </div>
              {/* SSLC */}
              <div className="border-l-2 border-teal-600 dark:border-teal-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Secondary (SSLC) - CBSE</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">DAV Senior Secondary school, Mogappair, Chennai • May 2020</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">Percentage: 92.80 %</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* Contact Section - Simplified */}
        <Section id="contact" centerContent={true}>
          <Card className="max-w-2xl mx-auto text-center"> {/* Added text-center */}
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Contact Me</h2> {/* Reduced margin */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Feel free to reach out to me via email or connect on LinkedIn.
            </p>
            {/* Removed the form */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <a href="mailto:harshavardhansomanathan@gmail.com" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-lg"> {/* Increased text size */}
                <Mail size={22} /> harshavardhansomanathan@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/harshavardhan-somanathan/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-lg"> {/* Increased text size */}
                <Linkedin size={22} /> LinkedIn
              </a>
            </div>
          </Card>
        </Section>
      </main>
      {/*<footer className="text-center py-8 text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Harshavardhan S. All rights reserved.</footer>*/}
    </div>
  );
}

export default App;
