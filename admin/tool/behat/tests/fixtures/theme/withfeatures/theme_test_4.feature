@behat_test @test4 @testtheme
Feature: Test feature 4
  In order to test behat.yml in phpunit
  As an user
  I need to be able to include this feature

  @javascript
  Scenario: I should not be included in normal execution.
    Given I pause scenario execution
