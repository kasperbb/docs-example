import { Tree } from "@/utils/tree";

interface SidebarProps {}

export function Sidebar() {
  const tree = new Tree('docs', {
    transformers(path) {
      const withoutPrefix = path.replaceAll('docs/', '').split('/');
      return {
        label: withoutPrefix.at(-1)!.replace('.mdx', '').replace(/([0-9]+-)/g, '').split('-').join(' ')
      }
    },
    filter: (_, child) => {
      return !child.path.includes('index');
    }
  });
 
  return (
    <div className="hidden md:flex w-[284px] md:shrink-0 sticky top-[121px] h-full md:flex-col md:justify-between">
      <nav className="flex flex-col pb-4 pr-2 overflow-y-auto dark:text-white">
        <ul>
          {tree.root.children.map(node => (
            <RootNavItem label={node.data.label} href={node.path}>
              <ul>
                {node.children.map(child => (
                  <NavItem label={child.data.label} href={child.path} />
                ))}
              </ul>
            </RootNavItem>
          ))}
        </ul>
      </nav>
    </div>      
  )
}

interface RootNavItemProps {
  label: string;
  href: string;
  children?: React.ReactNode;
}

export function RootNavItem({ label, href, children }: RootNavItemProps) {
  return (
    <li className="my-4">
      <a className="relative flex items-center justify-between w-full py-1 pl-2 text-sm text-left text-white capitalize rounded-md cursor-pointer" href={href}>
        {label}
      </a>

      {children}
    </li>
  )
}

interface NavItemProps {
  label: string;
  href: string;
  children?: React.ReactNode;
}

export function NavItem({ label, href, children }: NavItemProps) {
  return (
    <li className="my-1.5">
      <a className="relative flex items-center justify-between w-full py-1 pl-2 text-sm text-left text-gray-400 capitalize transition-colors rounded-md cursor-pointer hover:text-white" href={href}>
        {label}
      </a>

      {children}
    </li>
  )
}