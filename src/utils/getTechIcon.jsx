import React from 'react';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaAws, FaDocker, 
  FaFigma, FaShopify, FaStripe, FaPaypal,
  FaDatabase, FaCloud, FaCode, FaRobot, FaChartBar,
  FaLock, FaCog, FaLink, FaMobileAlt, FaSearch,
  FaGitAlt, FaVuejs, FaAngular, FaSass, FaHtml5, FaCss3Alt,
  FaJs, FaPhp, FaLaravel, FaWordpress, FaGoogle
} from 'react-icons/fa';

export const getTechIcon = (techName) => {
  const iconMap = {
    // AI & ML
    'OpenAI GPT': <FaRobot />,
    'TensorFlow': <FaRobot />,
    'PyTorch': <FaRobot />,
    'LangChain': <FaLink />,
    'Machine Learning': <FaRobot />,
    
    // Frontend
    'React': <FaReact />,
    'Next.js': <FaReact />,
    'Vue.js': <FaVuejs />,
    'TypeScript': <FaCode />,
    'Tailwind CSS': <FaCss3Alt />,
    'Redux': <FaReact />,
    
    // Backend & Languages
    'Node.js': <FaNodeJs />,
    'Python': <FaPython />,
    'Java': <FaJava />,
    '.NET': <FaCode />,
    
    // Databases
    'PostgreSQL': <FaDatabase />,
    'MongoDB': <FaDatabase />,
    'SQL': <FaDatabase />,
    
    // Cloud & DevOps
    'AWS': <FaAws />,
    'Azure': <FaCloud />,
    'GCP': <FaCloud />,
    'Docker': <FaDocker />,
    'Kubernetes': <FaDocker />,
    'Terraform': <FaCloud />,
    'Jenkins': <FaCog />,
    'CI/CD': <FaCog />,
    'Git': <FaGitAlt />,
    
    // Mobile
    'React Native': <FaMobileAlt />,
    'Swift': <FaMobileAlt />,
    'Kotlin': <FaMobileAlt />,
    'Flutter': <FaMobileAlt />,
    'Firebase': <FaDatabase />,
    
    // API & Integration
    'REST API': <FaLink />,
    'GraphQL': <FaLink />,
    'Webhooks': <FaLink />,
    'OAuth': <FaLock />,
    'Stripe': <FaStripe />,
    'PayPal': <FaPaypal />,
    
    // Design
    'Figma': <FaFigma />,
    'Adobe XD': <FaFigma />,
    'Sketch': <FaFigma />,
    'Prototyping': <FaCode />,
    'User Testing': <FaMobileAlt />,
    
    // E-commerce
    'Shopify': <FaShopify />,
    'WooCommerce': <FaShopify />,
    
    // Marketing & Analytics
    'Google Analytics': <FaChartBar />,
    'SEO Tools': <FaSearch />,
    'Social Media': <FaLink />,
    'Google Ads': <FaGoogle />,
    'Content Marketing': <FaCode />,
    
    // Blockchain
    'Solidity': <FaCode />,
    'Ethereum': <FaDatabase />,
    'Web3.js': <FaCode />,
    'Smart Contracts': <FaLock />,
    'IPFS': <FaDatabase />,
    
    // Analytics & BI
    'Tableau': <FaChartBar />,
    'Power BI': <FaChartBar />,
    'Apache Spark': <FaChartBar />,
    
    // Tools
    'Monitoring Tools': <FaChartBar />,
    'Security Audits': <FaLock />
  };

  return iconMap[techName] || <FaCode />;
};