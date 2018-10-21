FROM golang:1.8.5-jessie

RUN go get github.com/Masterminds/glide

# create a working directory
WORKDIR /go/src/app


ADD glide.yaml glide.yaml
ADD glide.lock glide.lock
RUN glide install

# add source code
ADD src src
ADD views views

RUN go build src/main.go
# run the binary
CMD ["./main"]