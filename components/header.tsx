import Link from "next/link";


const HeaderComponent = () => {


    return (
        <header>
            <div className="p-5">
                <Link href="/">
                    <a>
                        <h1 className="text-2xl font-bold text-primary2">
                            Polliette
                        </h1>
                    </a>
                </Link>
            </div>
        </header>

    )
}

export default HeaderComponent;