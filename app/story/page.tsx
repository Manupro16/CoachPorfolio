import {AspectRatio, Badge, Box, Code, DataList, Flex, Grid, Heading, IconButton, Link, Text} from "@radix-ui/themes";

function StoryPage() {

    return (
      <section title="story" className="w-screen h-screen">
          {/* Background Gradient */}
          <Box
              as="div"
              className="absolute inset-0 bg-gradient-to-r from-black via-primaryDark to-black opacity-30 pointer-events-none z-0"
          />
          <Grid as="div" columns="1fr 1fr" rows="1fr 1fr" className="w-screen h-screen">
              <Flex
                  as="div"
                  justify="start"
                  align="start"
                  className="pt-5 pl-10 z-10 row-span-1"
                  direction="column"
                  gap="2"
              >
                  <Heading
                      as="h1"
                      size="8"
                      weight="bold"
                      className="text-textLight leading-tight relative"
                      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                  >
                      Jose de Jesus Vera
                      <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-2 " />
                  </Heading>
                  <Text
                      as="p"
                      size="4"
                      className="text-textMuted leading-tight"
                      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                  >
                      Soccer Player Story
                  </Text>
                  <Text
                      as="p"
                      size="3"
                      className="text-gray-300 leading-relaxed"
                  >
                      Career status:  <Badge color="red">Retired</Badge>
                  </Text>
                  <Text
                      as="p"
                      size="3"
                      className="text-gray-300 leading-relaxed"
                  >
                      Lorem ipsum odor amet, consectetuer adipiscing elit. Senectus lacinia eu etiam vel sodales magna posuere. Felis potenti arcu penatibus integer magnis venenatis. Dignissim ultrices ullamcorper curae habitant tempus placerat scelerisque. In luctus praesent primis gravida morbi sodales fames laoreet curae? Ipsum gravida consectetur; hac egestas class nam nisi neque. Venenatis efficitur et non tellus nostra luctus faucibus efficitur. Fringilla sed turpis nisl hac tellus natoque conubia.

                      Suspendisse luctus facilisis, magna arcu dignissim risus. Molestie ut magna elit nostra fames aptent. Sapien nascetur risus cursus praesent vel; massa mattis habitant. Magna phasellus habitasse ipsum sapien cursus, risus at. Ad himenaeos id tincidunt nisi fusce suscipit aliquet lobortis lacinia. Elementum ante condimentum egestas ornare facilisis egestas consequat potenti. Inceptos suscipit volutpat aliquet curabitur non pretium nascetur. Himenaeos volutpat blandit risus ligula ante enim inceptos.

                      Posuere ut odio magnis, ipsum porttitor pellentesque. Dictumst ullamcorper tempor leo conubia suspendisse praesent elementum dui fringilla. Hendrerit nibh volutpat inceptos nisl velit nostra risus ut. Vulputate sem vel velit; habitasse quisque lacus. Varius phasellus ex libero at convallis quisque fusce consectetur magna. Placerat vestibulum luctus ultrices suscipit adipiscing nisi. Ligula enim ex vestibulum volutpat euismod montes viverra nisi. Amet tellus amet; ullamcorper massa velit mus. Condimentum vestibulum senectus non vehicula auctor scelerisque. Urna nunc cursus sit torquent ut enim euismod congue malesuada.

                      Nullam bibendum dictum tristique ex ante inceptos luctus eget. Maecenas nullam enim est purus parturient metus. Risus lobortis interdum, primis nibh metus convallis pulvinar nisl. Eleifend ultrices per nisi nisl, posuere ridiculus augue ullamcorper sapien. Conubia quis vehicula lobortis facilisi, urna turpis porta. Urna rutrum dis justo posuere gravida. Mauris sagittis vulputate habitasse duis libero, hac accumsan finibus.
                  </Text>

              </Flex>
              <Flex
                  as="div"
                  align="center"
                  justify="center"
                  className="relative h-full z-10 row-span-1"
              >
                  <Box
                      as="div"
                      className="relative w-[90%] h-[90%] border border-borderDark rounded-lg shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105"
                  >
                      <AspectRatio ratio={16 / 12}>
                          <img
                              src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
                              alt="A house in a forest"
                              style={{
                                  objectFit: 'cover',
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: 'var(--radius-2)',
                              }}
                          />
                      </AspectRatio>
                      <Box
                          as="div"
                          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                      />
                  </Box>
              </Flex>
              <Flex
                  as="div"
                  justify="start"
                  align="start"
                  className="pt-5 pl-10 z-10 row-span-1"
                  direction="column"
                  gap="2"
              >
                  <Text
                      as="p"
                      size="3"
                      className="text-textMuted leading-tight"
                      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                  >
                      Lorem ipsum odor amet, consectetuer adipiscing elit. Senectus lacinia eu etiam vel sodales magna posuere. Felis potenti arcu penatibus integer magnis venenatis. Dignissim ultrices ullamcorper curae habitant tempus placerat scelerisque. In luctus praesent primis gravida morbi sodales fames laoreet curae? Ipsum gravida consectetur; hac egestas class nam nisi neque. Venenatis efficitur et non tellus nostra luctus faucibus efficitur. Fringilla sed turpis nisl hac tellus natoque conubia.

                      Suspendisse luctus facilisis, magna arcu dignissim risus. Molestie ut magna elit nostra fames aptent. Sapien nascetur risus cursus praesent vel; massa mattis habitant. Magna phasellus habitasse ipsum sapien cursus, risus at. Ad himenaeos id tincidunt nisi fusce suscipit aliquet lobortis lacinia. Elementum ante condimentum egestas ornare facilisis egestas consequat potenti. Inceptos suscipit volutpat aliquet curabitur non pretium nascetur. Himenaeos volutpat blandit risus ligula ante enim inceptos.

                      Posuere ut odio magnis, ipsum porttitor pellentesque. Dictumst ullamcorper tempor leo conubia suspendisse praesent elementum dui fringilla. Hendrerit nibh volutpat inceptos nisl velit nostra risus ut. Vulputate sem vel velit; habitasse quisque lacus. Varius phasellus ex libero at convallis quisque fusce consectetur magna. Placerat vestibulum luctus ultrices suscipit adipiscing nisi. Ligula enim ex vestibulum volutpat euismod montes viverra nisi. Amet tellus amet; ullamcorper massa velit mus. Condimentum vestibulum senectus non vehicula auctor scelerisque. Urna nunc cursus sit torquent ut enim euismod congue malesuada.

                      Nullam bibendum dictum tristique ex ante inceptos luctus eget. Maecenas nullam enim est purus parturient metus. Risus lobortis interdum, primis nibh metus convallis pulvinar nisl. Eleifend ultrices per nisi nisl, posuere ridiculus augue ullamcorper sapien. Conubia quis vehicula lobortis facilisi, urna turpis porta. Urna rutrum dis justo posuere gravida. Mauris sagittis vulputate habitasse duis libero, hac accumsan finibus.
                  </Text>

              </Flex>
              <Flex
                  as="div"
                  justify="start"
                  align="start"
                  className="pt-5 pl-10 z-10 row-span-1"
                  direction="column"
                  gap="2"
              >
                  <Text
                      as="p"
                      size="3"
                      className="text-textMuted leading-tight"
                      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                  >
                      Lorem ipsum odor amet, consectetuer adipiscing elit. Senectus lacinia eu etiam vel sodales magna posuere. Felis potenti arcu penatibus integer magnis venenatis. Dignissim ultrices ullamcorper curae habitant tempus placerat scelerisque. In luctus praesent primis gravida morbi sodales fames laoreet curae? Ipsum gravida consectetur; hac egestas class nam nisi neque. Venenatis efficitur et non tellus nostra luctus faucibus efficitur. Fringilla sed turpis nisl hac tellus natoque conubia.

                      Suspendisse luctus facilisis, magna arcu dignissim risus. Molestie ut magna elit nostra fames aptent. Sapien nascetur risus cursus praesent vel; massa mattis habitant. Magna phasellus habitasse ipsum sapien cursus, risus at. Ad himenaeos id tincidunt nisi fusce suscipit aliquet lobortis lacinia. Elementum ante condimentum egestas ornare facilisis egestas consequat potenti. Inceptos suscipit volutpat aliquet curabitur non pretium nascetur. Himenaeos volutpat blandit risus ligula ante enim inceptos.

                      Posuere ut odio magnis, ipsum porttitor pellentesque. Dictumst ullamcorper tempor leo conubia suspendisse praesent elementum dui fringilla. Hendrerit nibh volutpat inceptos nisl velit nostra risus ut. Vulputate sem vel velit; habitasse quisque lacus. Varius phasellus ex libero at convallis quisque fusce consectetur magna. Placerat vestibulum luctus ultrices suscipit adipiscing nisi. Ligula enim ex vestibulum volutpat euismod montes viverra nisi. Amet tellus amet; ullamcorper massa velit mus. Condimentum vestibulum senectus non vehicula auctor scelerisque. Urna nunc cursus sit torquent ut enim euismod congue malesuada.

                      Nullam bibendum dictum tristique ex ante inceptos luctus eget. Maecenas nullam enim est purus parturient metus. Risus lobortis interdum, primis nibh metus convallis pulvinar nisl. Eleifend ultrices per nisi nisl, posuere ridiculus augue ullamcorper sapien. Conubia quis vehicula lobortis facilisi, urna turpis porta. Urna rutrum dis justo posuere gravida. Mauris sagittis vulputate habitasse duis libero, hac accumsan finibus.
                  </Text>

              </Flex>


          </Grid>

      </section>
    );
}


export default StoryPage;

