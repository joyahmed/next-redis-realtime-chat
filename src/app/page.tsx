import Button from '@/components/ui/Button';
import { db } from '@/lib/db';

interface HomeProps {}

const Home = async ({ }: HomeProps) => {

	await db.set('hello', 'hello')

	return (
		<div className=''>
			<Button>hello</Button>
		</div>
	);
};

export default Home;
