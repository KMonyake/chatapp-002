import renderer from "react-test-renderer";
import AuthProvider from "./context";


// snapshot test
it('renders correctly', () => {
    const tree = renderer.create(<AuthProvider/>).toJSON();
    expect(tree).toMatchSnapshot();
});
