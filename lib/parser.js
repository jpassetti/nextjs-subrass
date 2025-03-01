import parse from "html-react-parser";

import Anchor from "../components/anchor";
import Heading from "../components/heading";
import Paragraph from "../components/paragraph";
import Text from "../components/text";
import List from "../components/list";
import ListItem from "../components/listitem";

// Function to generate a pseudo-random ID
const getPseudoID = () => Math.floor(Math.random() * 1e15);

// Component mapping with direct JSX output
const components = {
 h1: ({ children }) => <Heading level="1">{children}</Heading>,
 h2: ({ children }) => (
  <Heading level="2" marginTop={3} marginBottom={1}>
   {children}
  </Heading>
 ),
 h3: ({ children }) => (
  <Heading level="3" marginTop={2} marginBottom={1}>
   {children}
  </Heading>
 ),
 p: ({ children }) => <Paragraph>{children}</Paragraph>,
 a: ({ attribs, children }) => (
  <Anchor href={attribs?.href} target={attribs?.target}>
   {children}
  </Anchor>
 ),
 ul: ({ children }) => <List includeBullets={true}>{children}</List>,
 li: ({ children }) => <ListItem showBullet={true}>{children}</ListItem>,
 strong: ({ children }) => <Text bold>{children}</Text>,
 em: ({ children }) => <Text italic>{children}</Text>,
 br: () => <br />,
};

// Function to parse each node
const tagParser = (domNode) => {
 if (domNode.type === "text") {
  return <Text key={`${domNode.type}${getPseudoID()}`}>{domNode.data}</Text>;
 } else if (domNode.type === "tag") {
  const { attribs, name, children } = domNode;

  const Component = components[name];

  if (!Component) return null; // Skip unrecognized tags

  // ✅ Ensure children are fully parsed
  const parsedChildren = children?.map((child) => tagParser(child)) || [];

  return (
   <Component key={`${name}${getPseudoID()}`} attribs={attribs}>
    {parsedChildren}
   </Component>
  );
 }

 return null;
};

// Main parser function
const ContentParser = ({ content }) => {
 const options = {
  replace: (domNode) => tagParser(domNode),
 };

 return content ? parse(content, options) : "";
};

export default ContentParser;
