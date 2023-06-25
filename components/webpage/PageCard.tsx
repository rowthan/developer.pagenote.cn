export default function PageCard() {
    return (
        <article className="flex bg-white transition hover:shadow-xl">
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                    dateTime="2022-10-10"
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                    <span>2022</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                </time>
            </div>

            <div className="hidden sm:block sm:basis-56">
                <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                            Finding the right guitar for your style - 5 tips
                        </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                        dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                        sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                        Molestias explicabo corporis voluptatem?
                    </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                    <a
                        href="#"
                        className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                    >
                        Read Blog
                    </a>
                </div>
            </div>
        </article>

    )

    return (
        <div

            className="relative block overflow-hidden rounded-lg border border-gray-100 p-2"
        >
  <span
      className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Building a SaaS product as a software developer
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt="Paul Clapton"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="max-w-[40ch] text-sm text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                    provident a, ipsa maiores deleniti consectetur nobis et eaque.
                </p>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Published</dt>
                    <dd className="text-xs text-gray-500">31st June, 2021</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                    <dd className="text-xs text-gray-500">3 minute</dd>
                </div>
            </dl>
        </div>

    )
}
