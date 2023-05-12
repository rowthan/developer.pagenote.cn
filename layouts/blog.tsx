import { PropsWithChildren, Suspense } from 'react'
import DeveloperContainer from 'components/DeveloperContainer'
import { Post } from 'lib/types'

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post?: Post }>) {
  return (
    <DeveloperContainer
      title={`${post?.title} – pagenote`}
      description={post?.excerpt || ''}
      date={new Date().toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl dark:text-white">
          {post?.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Lee Robinson"
              height={24}
              width={24}
              sizes="20vw"
              src="https://pagenote.cn/favicon.ico"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {post?.excerpt}
            </p>
          </div>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {children}
          </div>
        </Suspense>
      </article>
    </DeveloperContainer>
  )
}
