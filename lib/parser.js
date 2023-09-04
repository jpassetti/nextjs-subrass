import parse from 'html-react-parser';

import Anchor from '../components/anchor'
import Paragraph from '../components/paragraph'
import Text from '../components/text'

const tagParser = (domNode) => {
	//console.log("parsing tag"); 
	//console.log({domNode})
	const getPsuedoID = () => Math.floor(Math.random() * 1e15);

	const components = {
		p: Paragraph,
		a: Anchor,
	}
	if (domNode.type === "text") {
		const { data } = domNode;
		//console.log(domNode, { depth: null });
		return <Text key={`${domNode.type}${getPsuedoID()}`}>{data}</Text>
	} else {
		const { attribs, name, children } = domNode;
		const ComponentName = components[name];
		return <ComponentName attribs={domNode.attribs ? attribs : ''} key={`${name}${getPsuedoID()}`} name={name}>{(children && children.length > 0) && children.map((child) => {
			return tagParser(child);
		})}</ComponentName>
	}
} // tagParser end


const ContentParser = ({ content }) => {
	const options = {
		replace: domNode => {
			return tagParser(domNode);
		}
	};
	//console.log({ content });
	return (content !== '') ? parse(content, options) : '';
}
export default ContentParser;
