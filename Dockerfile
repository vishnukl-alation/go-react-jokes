FROM golang:1.8.5-jessie

# install dep
RUN go get github.com/golang/dep/cmd/dep

WORKDIR /go/src/app
ADD src/jokes/Gopkg.toml src/jokes/Gopkg.toml
ADD src/jokes/Gopkg.lock src/jokes/Gopkg.lock
ADD src src
ADD views views

WORKDIR /go/src/app/src/jokes
RUN dep ensure --vendor-only

WORKDIR /go/src/app
RUN go build src/jokes/main.go
# run the binary
CMD ["./main"]