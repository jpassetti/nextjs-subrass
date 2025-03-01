const Anchor = ({ href, target, children }) => {
 return (
  <a href={href} target={target ? target : "_self"} rel="noopener noreferrer">
   {children}
  </a>
 );
};
export default Anchor;
