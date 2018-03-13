echo 'Token Test Buggy'
ls -l TokensTestBuggy | egrep -c '^-' 

echo 'Token Test Correct'
ls -l TokensTestCorrect | egrep -c '^-'

echo 'Token Dev Buggy'
ls -l TokensDevBuggy | egrep -c '^-' 

echo 'Token Dev Correct'
ls -l TokensDevCorrect | egrep -c '^-'

echo 'Token Train Buggy'
ls -l TokensTrainBuggy | egrep -c '^-' 

echo 'Token Test Correct'
ls -l TokensTrainCorrect | egrep -c '^-'

