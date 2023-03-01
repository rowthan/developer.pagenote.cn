
export default function NoticeModal(){
    return(
        <div>

<div class="fixed left-0 bottom-0 z-40 " x-data="{cookies: true}" x-init='$watch("cookies", o => !o && window.setTimeout(() => (cookies = true), 1000)); setTimeout(() => cookies = true, 1500)' @keydown.window.escape="cookies = false">
    <div x-show="cookies" class="fixed sm:left-4 bottom-20 rounded-lg bg-white shadow-2xl w-full sm:w-1/2 xl:w-1/4 max-w-[450px] overflow-hidden"
         style="display: none;"
         x-transition:enter="transition ease-in duration-200"
         x-transition:enter-start="opacity-0 transform -translate-x-40"
         x-transition:enter-end="opacity-100 transform translate-x-0"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 transform translate-x-0"
         x-transition:leave-end="opacity-0 transform -translate-x-40">

        <!-- Text -->
        <div class="">
            <div class="relative overflow-hidden px-8 pt-8">
                <div width="80" height="77" class="absolute -top-10 -right-10 text-yellow-500">
                    <svg width="120" height="119" viewBox="0 0 120 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3"
                              d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z"
                              fill="currentColor"/>
                    </svg>
                </div>
                <div class="text-2xl flex flex-col pb-4">
                    <small>Hello there..</small>
                    <span class="text-3xl font-bold">We are the Cookies !</span>
                </div>
                <div class="pb-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus aliquid aperiam beatae
                        consectetur culpa dolores eum expedita, ipsam iure laboriosam nobis odit quos, sed sunt
                        veritatis
                        voluptas voluptate voluptatum!
                    </p>
                </div>
            </div>

        </div>
        <!-- Boutons -->
        <div class="w-full flex justify-center items-center border-t border-solid border-gray-200">
            <button class="border-r border-gray-200 flex-1 px-4 py-3 text-gray-500 hover:text-white hover:bg-red-400 duration-150" @click="cookies = false">
                No thanks !
            </button>
            <button class="flex-1 px-4 py-3 text-gray-500 hover:text-white hover:bg-green-400 duration-150" @click="cookies = false">
                Off course
            </button>
        </div>
    </div>
    <!-- BTN -->
    <button class="fixed left-4 bottom-2 uppercase text-sm px-4 py-3 bg-gray-900 text-white rounded-full"
            @click="cookies = !cookies">
        Cookies
    </button>
</div>

<!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
<div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
        <a title="Buy me a beer" href="https://www.buymeacoffee.com/tonyricher" target="_blank" class="block w-full h-12 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img class="object-cover object-center w-full h-full rounded-full" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=tonyricher&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"/>
        </a>
    </div>
</div>

        </div>
    )
}