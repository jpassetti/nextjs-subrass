import { Fragment } from 'react'

const Text = ({ children }) => {
	return <Fragment>{children}</Fragment>
}
const Strong = ({ children }) => {
	return <strong>{children}</strong>
}
Text.Strong = Strong;
const Italics = ({ children }) => {
	return <em>{children}</em>
}
Text.Italics = Italics;
export default Text;
