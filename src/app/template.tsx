/** Re-mounts on navigation, giving each route a short CSS enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
