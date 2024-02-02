import LayoutShowcase from "../components/layout/LayoutShowcase";

const Contact: React.FC = () => {
  return (
    <LayoutShowcase>
      <div className="mx-auto w-full max-w-7xl lg:px-8 py-12">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
              <div className="lg:pl-20">
                <div className="max-w-xs px-2.5 lg:max-w-none">
                  {/* Update your image path */}
                  <img
                    alt="Portrait of Greg Uretzky"
                    className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                    src="images/greg_uretzky_profile.png"
                  />
                </div>
              </div>
              <div className="lg:order-first lg:row-span-2">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  I’m Greg Uretzky. I live in the Netherlands, where I craft the
                  web's future.
                </h1>
                <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                  <p>
                    From a young age, technology captured my imagination. Today,
                    I blend creativity and coding to build digital experiences
                    that matter.
                  </p>
                  <p>
                    Beyond code, I'm passionate about the great outdoors,
                    finding inspiration in nature's complexity and beauty.
                  </p>
                  <p>
                    My journey in technology began with tinkering on my family's
                    old computer, leading to a deep dive into web development
                    during my teenage years. This exploration laid the
                    foundation for my career as a full-stack developer, where I
                    leverage languages like TypeScript, JavaScript, and Python
                    to turn complex problems into elegant solutions.
                  </p>
                  <p>
                    I thrive in environments that challenge the status quo,
                    constantly seeking to learn new frameworks and technologies.
                    My toolbox is ever-expanding, with recent endeavors into
                    cloud services and containerization to streamline
                    development and deployment processes.
                  </p>
                  <p>
                    Collaboration and knowledge sharing form the cornerstone of
                    my professional ethos. I actively contribute to open-source
                    projects and enjoy mentoring aspiring developers, believing
                    that our collective growth strengthens the tech community.
                  </p>
                  <p>
                    When not glued to a computer screen, you can find me hiking
                    through the Netherlands' picturesque landscapes or planning
                    my next adventure. These moments away from the keyboard are
                    crucial, providing fresh perspectives that I bring back to
                    my work.
                  </p>
                  <p>
                    Looking ahead, I am excited by the possibilities of emerging
                    technologies and their potential to solve real-world
                    problems. Whether it's through developing innovative web
                    applications or contributing to sustainability through tech,
                    I am committed to making an impact.
                  </p>
                </div>
              </div>
              <div className="lg:pl-20">
                {/* Social Links */}
                <ul role="list">
                  {/* Ensure URLs are correct */}
                  <li className="flex">
                    <a
                      className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                      href="https://www.linkedin.com/in/uretzkyzvi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ml-4">LinkedIn</span>
                    </a>
                  </li>
                  <li className="mt-4 flex">
                    <a
                      className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                      href="https://github.com/UretzkyZvi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ml-4">GitHub</span>
                    </a>
                  </li>
                  {/* Add more social links as needed */}
                  <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
                    <a
                      className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                      href="mailto:uretsky.zvi@gmail.com"
                    >
                      <span className="ml-4">Email</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutShowcase>
  );
};
export default Contact;
