Feature: Return raw data/search results but without any styling
    I want to see search and see the search results

    Scenario Outline: Single character input shows no result
        Given I am a visitor on the Search Box within the rentalcars.com homepage
        When I enter a single alphanumeric character "<SingleCharacter>" into the pick up location
        Then the placeholder text disappears
        And no search results list is display
        Examples:
            | SingleCharacter |
            | M               |
    Scenario Outline: 2 or more character input shows result list
        Given I am a visitor on the Search Box within the rentalcars.com homepage
        When I enter two or more alphanumeric characters "<ThreeCharacters>" into the pick up location
        Then I see a list of search result
        And The maximum number of search results displayed is six
        Examples:
            | ThreeCharacters |
            | Man             |

    Scenario Outline: invalid entry shows message No results found
        Given I am a visitor on the Search Box within the rentalcars.com homepage
        When I enter two or more alphanumeric characters "<ThreeCharacters>" into the pick up location
        Then I should see the message "<Message>"
        Examples:
            | ThreeCharacters | Message          |
            | XXXX            | No results found |

    Scenario Outline: results list is not displayed anymore when leaving one character
        Given I am a visitor on the Search Box within the rentalcars.com homepage
        And I enter two or more alphanumeric characters "<ThreeCharacters>" into the pick up location
        When I remove the search term leaving only one character "<SingleCharacter>"
        Then the search results list no longer displayed
        Examples:
            | ThreeCharacters | SingleCharacter |
            | Man             | M               |