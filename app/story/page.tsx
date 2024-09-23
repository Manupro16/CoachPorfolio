// components/StoryPage.tsx

import React from 'react';
import {
    AspectRatio,
    Badge,
    Box,
    Flex,
    Grid,
    Heading,
    Text,
} from '@radix-ui/themes';

function StoryPage() {

    return (

      <section title="story" className="w-screen h-auto relative">
          {/* Background Gradient */}
          <Box
              as="div"
              className="absolute inset-0 bg-gradient-to-r from-black via-primaryDark to-black opacity-30 pointer-events-none z-0"
          />
          {/* Main Content */}
          <Box className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
              {/* Introduction */}
              <Flex direction="column" align="center" className="text-center mb-16">
                  <Heading
                      as="h1"
                      size="8"
                      weight="bold"
                      className="text-textLight leading-tight"
                      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                  >
                      Jose de Jesus Vera
                  </Heading>
                  <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-2 mb-4" />
                  <Text
                      as="p"
                      size="4"
                      className="text-textMuted max-w-2xl"
                      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                  >
                      The remarkable journey of Coach Chuy Vera as a player and coach.
                  </Text>
                  <Text
                      as="p"
                      size="3"
                      className="text-gray-300 mt-2"
                  >
                      Career status: <Badge color="red">Retired</Badge>
                  </Text>
              </Flex>
              {/* Early Life and Playing Career */}
              <Box className="mb-16">
                  <Heading as="h2" size="6" className="text-primary mb-4">
                      Early Life and Playing Career
                  </Heading>
                  <Grid columns={{ initial: '1fr', md: '1fr 1fr' }} gap="8">
                      <Text as="p" size="3" className="text-gray-300 leading-relaxed">
                          {/* Insert placeholder text or actual content here */}
                          Lorem ipsum odor amet, consectetuer adipiscing elit. Nullam laoreet aliquet leo lacus senectus semper. Quis purus curae amet donec montes mollis. Sodales vestibulum eros feugiat purus nullam nulla dignissim libero. Accumsan hac class leo cubilia tellus quis. Dignissim ut elementum mauris et rhoncus, montes odio. Mi tortor iaculis iaculis natoque fringilla faucibus. Viverra conubia donec per ullamcorper porttitor fusce?

                          Pellentesque accumsan velit posuere bibendum taciti aenean euismod dictum. Conubia sem senectus eget tincidunt nisl. Gravida nisl viverra dictum blandit finibus metus et urna efficitur. Lacus elementum ultrices quis fringilla eu ut ullamcorper montes. Interdum metus nunc nullam, tempus ultricies sapien duis ante. Eros nostra tristique inceptos vitae duis accumsan sed penatibus. Metus varius iaculis vitae; conubia aliquam class convallis. Ridiculus non integer efficitur ullamcorper semper per.

                          Risus varius pharetra vestibulum class urna tellus himenaeos. Vitae volutpat imperdiet enim eget cursus, et lobortis. Gravida in diam parturient tincidunt, massa mauris. Dapibus erat donec eros; at phasellus aliquam penatibus senectus. Euismod pellentesque ullamcorper mollis sem nam dapibus dui? Praesent massa imperdiet adipiscing volutpat sociosqu pellentesque. Quisque blandit sodales ultrices torquent habitasse. Nascetur cubilia sapien porta dapibus faucibus at.
                      </Text>
                      <AspectRatio ratio={16 / 9}>
                          <img
                              src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
                              alt="Coach Vera in his early years"
                              className="w-full h-full object-cover rounded-lg"
                          />
                      </AspectRatio>
                  </Grid>
              </Box>
              {/* Transition to Coaching */}
              <Box className="mb-16">
                  <Heading as="h2" size="6" className="text-primary mb-4">
                      Transition to Coaching
                  </Heading>
                  <Grid columns={{ initial: '1fr', md: '1fr 1fr' }} gap="8">
                      <AspectRatio ratio={16 / 9}>
                          <img
                              src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
                              alt="Transition to coaching"
                              className="w-full h-full object-cover rounded-lg"
                          />
                      </AspectRatio>
                      <Text as="p" size="3" className="text-gray-300 leading-relaxed">
                          {/* Insert placeholder text or actual content here */}
                          Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae dignissim eget dapibus iaculis porta gravida sit adipiscing tincidunt. Viverra primis sit euismod; mollis senectus id nunc quam. Dis quam arcu nunc, pretium hac curae eleifend dis. Lacinia elementum litora posuere nibh lacinia. Nibh scelerisque venenatis odio vulputate nec laoreet phasellus. Purus nibh lacus sem erat risus nullam torquent. Platea ligula a orci feugiat efficitur. Magna inceptos eu magna pellentesque et finibus viverra.

                          Sollicitudin bibendum interdum netus tortor inceptos donec eros. Torquent parturient euismod leo finibus placerat mauris netus at. Quisque curae etiam risus litora nunc faucibus. Sodales pharetra at odio inceptos pretium eu dapibus. Platea potenti faucibus ligula vehicula proin. Malesuada felis porta felis erat fringilla blandit aliquam pretium. Aenean nisl habitant consequat interdum dui. At arcu faucibus quisque leo; primis quam. Magnis tellus dis taciti inceptos leo sapien imperdiet ad?

                          Velit taciti mattis auctor habitasse conubia primis integer. Vel urna tortor blandit rutrum potenti rhoncus gravida pretium dignissim. Dui penatibus placerat sodales enim taciti consequat. Sagittis aptent scelerisque vitae tortor montes. Dis augue risus eu laoreet blandit. Nisi a urna quisque vulputate augue curae ante fringilla. Blandit hendrerit enim purus fermentum eu dapibus platea.

                          Non platea leo egestas hac; nostra viverra etiam vulputate. Porta duis phasellus sit per neque nostra ante condimentum. Aptent pulvinar felis mattis vitae; netus rhoncus proin nibh. Mattis ante feugiat orci pellentesque, inceptos quis nulla. Ipsum cras neque consequat felis fringilla; faucibus vulputate ut. Parturient varius inceptos arcu netus hac magna justo egestas. Fames bibendum felis eleifend magnis metus lorem magnis praesent. Leo rutrum vestibulum morbi est faucibus duis tellus nulla. Accumsan justo sagittis enim dui ante. Quisque eget scelerisque etiam; convallis enim nisi tristique.
                      </Text>
                  </Grid>
              </Box>
          </Box>
      </section>
    );
}


export default StoryPage;

